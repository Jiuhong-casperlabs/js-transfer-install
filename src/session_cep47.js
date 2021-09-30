import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLOption,
  CLMap,
  CLString,
  CLList,
  CLByteArray,
  CLKey,
  CLU32,
} from "casper-js-sdk";
import { Some, None } from "ts-results";
import * as utils from "../utils";
import * as constants from "../constants";

const AMOUNT_TO_TRANSFER = 2500000000;

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_CEP47_KEYS
  );
  //Step 2.1: Set transfer target key pair
  const keyPairofTarget = utils.getKeyPairOfContract(
    constants.PATH_TO_TRAGET_KEYS
  );
  //Step3: Query node for global state root hash
  const stateRootHash = await utils.getStateRootHash(client);

  //Step4: Query node for contract hash
  const contractHash = await utils.getAccountNamedKeyValue(
    client,
    stateRootHash,
    keyPairofContract,
    "jiuhong_contract"
  );
  const contractHashAsByteArray = [
    ...Buffer.from(contractHash.slice(5), "hex"),
  ];

  //Step 5: Invoke contract transfer endpoint.

  //Step 5.1 Set deploy

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "mint_one",
      RuntimeArgs.fromMap({
        recipient: new CLKey(
          new CLByteArray(new Uint8Array(keyPairofTarget.accountHash()))
        ),
        token_ids: new CLOption(Some(new CLString("SJH"))),
        // token_ids: new CLOption(Some(new CLList([new CLString("SJH")]))),
        token_meta: new CLMap([[new CLString("aaa"), new CLString("bbb")]]),
        // token_meta: new CLMap([[new CLString(""), new CLString("")]]),
        // count: new CLU32(1),
      })
    ),
    DeployUtil.standardPayment(
      constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
    )
  );

  //Step 5.2 Sign deploy.
  deploy = client.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.putDeploy(deploy);

  console.log(`mint_one -- deploy hash = ${deployHash}`);
};

main();

//https://testnet.cspr.live/deploy/9d242efa3fab8b5191a2eabe8922da9d4fa9f9f94328efecb31fe6de09f57d15
