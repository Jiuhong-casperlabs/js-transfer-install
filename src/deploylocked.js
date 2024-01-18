import {
  CasperServiceByJsonRPC,
  DeployUtil,
  RuntimeArgs,
  CLList,
  CLByteArray,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT = constants.PATH_TO_LOCKED;

/**
 * Demonstration entry point.
 */
const main = async () => {
  // Step 1: Set casper node client.
  const client = new CasperServiceByJsonRPC(constants.DEPLOY_NODE_ADDRESS);

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getKeyPairOfContract(
    constants.PATH_TO_SOURCE_KEYS
  );

  const publickKey98 = utils.getKeyPairOfContract(
    constants.PATH_LIST_KEY98
  ).publicKey;

  const publickKey11 = utils.getKeyPairOfContract(
    constants.PATH_LIST_KEY11
  ).publicKey;

  const myList = new CLList([publickKey98, publickKey11]);

  const hash =
    "3880439f6910501f14b0492540559c9207354502ae9b52a51553641cb3617d3f";
  const hex = new CLByteArray(Uint8Array.from(Buffer.from(hash, "hex")));

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({
        users: myList,
        share_hash: hex,
      })
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_INSTALL)
  );

  // Step 4: Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairOfContract);

  // Step 5: Dispatch deploy to node.
  const deployHash = await client.deploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();

// npm run deploylock
