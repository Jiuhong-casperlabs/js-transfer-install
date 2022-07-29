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
  CLU256,
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
    "my_contract_contract_hash"
  );
  const contractHashAsByteArray = [
    ...Buffer.from(contractHash.slice(5), "hex"),
  ];

  const token_ids = new CLList([new CLU256(1), new CLU256(2), new CLU256(3)]);

  const token_meta1 = new CLMap([[new CLString("a"), new CLString("aa")]]);
  const token_meta2 = new CLMap([[new CLString("b"), new CLString("bb")]]);
  const token_meta3 = new CLMap([[new CLString("c"), new CLString("cc")]]);
  const token_metas = new CLList([token_meta1, token_meta2, token_meta3]);

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "mint",
      RuntimeArgs.fromMap({
        recipient: new CLKey(
          new CLByteArray(new Uint8Array(keyPairofTarget.accountHash()))
        ),
        token_ids: token_ids,
        token_metas: token_metas,
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
