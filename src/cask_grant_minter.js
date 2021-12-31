import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLValueBuilder,
  CLMap,
  CLList,
  CLKey,
  CLPublicKey,
  CLAccountHash,
  CLString,
  CLOption
} from "casper-js-sdk";
import * as utils from "../utils";
import { Some, None } from "ts-results";
import * as constants from "../constants";

const AMOUNT_TO_TRANSFER = 2500000000;

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_SOURCE_KEYS
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
    "CVCV_contract_hash"
  );
  const contractHashAsByteArray = [
    ...Buffer.from(contractHash.slice(5), "hex"),
  ];

  const hexString = "010e31a03ea026a8e375653573e0120c8cb96699e6c9721ae1ea98f896e6576ac3"
  const hash = CLPublicKey.fromHex(hexString).toAccountHash()

  const accounthash = new CLAccountHash(hash);
  const minter = new CLKey(accounthash);

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
      "grant_minter",
      RuntimeArgs.fromMap({
        minter: minter,
      })
    ),
    DeployUtil.standardPayment(
      constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
    )
  );

  //   deploy = DeployUtil.addArgToDeploy(
  //     deploy,
  //     "toAccountAddr",
  //     keyPairofTarget.publicKey
  //   );

  //Step 5.2 Sign deploy.
  deploy = client.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.putDeploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();

//https://testnet.cspr.live/deploy/dea33f7780cd2dd8d6c56fa83e2789738cece169a9b5dc29f50d148d7cf841aa
