/**
 * @fileOverview CSPR JS SDK demo: CASK - install contract.
 */

import {
  CasperClient,
  DeployUtil,
  RuntimeArgs,
  CLString,
  CLMap,
  CLByteArray,
  CLAccountHash,
  CLPublicKey,
  CLList,
  CLKey,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT = constants.PATH_TO_CONTRACT_CASPER_IDO;

//test99
const pk1String1 =
  "010e31a03ea026a8e375653573e0120c8cb96699e6c9721ae1ea98f896e6576ac3";
const pk1 = CLPublicKey.fromHex(pk1String1);

// test98
const pk2String2 =
  "01bed05482905c4a7f47837aeffbde82df64abc1ab2b64519b638de81c8c7d4f58";
const pk2 = CLPublicKey.fromHex(pk2String2);

const ACCOUNT_PUBKEYS = new CLList([pk1, pk2]);

//**************************** for accounthash start*******************************/
const hexString1 =
  "010e31a03ea026a8e375653573e0120c8cb96699e6c9721ae1ea98f896e6576ac3";

const myHash1 = new CLAccountHash(
  CLPublicKey.fromHex(hexString1).toAccountHash()
);

const address = new CLKey(myHash1);

/**
 * Demonstration entry point.
 */
const main = async () => {
  // Step 1: Set casper node client.
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getKeyPairOfContract(
    constants.PATH_TO_SOURCE_KEYS
  );

  // let contract_name: String = runtime::get_named_arg("contract_name");
  // let default_treasury_wallet: Address = runtime:: get_named_arg("default_treasury_wallet");

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
        contract_name: new CLString("casperidotest"),
        default_treasury_wallet: address,
      })
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_INSTALL)
  );

  // Step 4: Sign deploy.
  deploy = client.signDeploy(deploy, keyPairOfContract);

  // Step 5: Dispatch deploy to node.
  const deployHash = await client.putDeploy(deploy);

  // Step 6: Render deploy details.
  logDetails(deployHash);
};

/**
 * Emits to stdout deploy details.
 * @param {String} deployHash - Identifer of dispatched deploy.
 */
const logDetails = (deployHash) => {
  console.log(`
---------------------------------------------------------------------
... deploy hash = ${deployHash}
---------------------------------------------------------------------
    `);
};

main();
