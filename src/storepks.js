/**
 * @fileOverview CSPR JS SDK demo: CASK - install contract.
 */

import {
  CasperClient,
  DeployUtil,
  RuntimeArgs,
  CLPublicKey,
  CLAccountHash,
  CLKey,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT = constants.PATH_TO_STORE_KEYS;

//test99
const pk1String1 =
  "010e31a03ea026a8e375653573e0120c8cb96699e6c9721ae1ea98f896e6576ac3";
const pk1 = CLPublicKey.fromHex(pk1String1);

// test98
const pk2String2 =
  "02025977ea84931dc9fa09c0ecd899c8716162512d0b2384477a015803ab375a8615";
const pk2 = CLPublicKey.fromHex(pk2String2);

//
const hexString1 =
  "010e31a03ea026a8e375653573e0120c8cb96699e6c9721ae1ea98f896e6576ac3";

const myHash1 = new CLAccountHash(
  CLPublicKey.fromHex(hexString1).toAccountHash()
);

const key1 = new CLKey(myHash1);
//
const hexString =
  "63b82f736afb9ae7177398ed8dd18cc662119d52ad0c509c3881d83b606d3b61";

const hex1 = Uint8Array.from(Buffer.from(hexString, "hex"));

// const token_contract_hash = new CLKey(new CLByteArray(hex1));
const key_accounthash = new CLKey(new CLAccountHash(hex1));
//
const hexString2 =
  "02025977ea84931dc9fa09c0ecd899c8716162512d0b2384477a015803ab375a8615";

const myHash2 = new CLAccountHash(
  CLPublicKey.fromHex(hexString2).toAccountHash()
);

const key2 = new CLKey(myHash2);

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

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      // constants.DEPLOY_CHAIN_NAME,
      "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({
        pk1,
        pk2,
        key1: pk2,
        key2,
        key_accounthash,
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
