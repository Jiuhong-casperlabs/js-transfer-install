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
  CLKey,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT = constants.PATH_TO_CONTRACT_CASK;

// Token parameters.
const TOKEN_NAME = new CLString("Cask Token");
const TOKEN_SYMBOL = new CLString("CASK");
const myKey = new CLString("hello");
const myVal = new CLString("world");
const TOKEN_META = new CLMap([[myKey, myVal]]);
const TOKEN_contract_name = new CLString("CVCV");

//**************************** for accounthash start*******************************/
const hexString1 =
  "0152836c51eac04205bb7febe9d92da50758178b0bf388bd03e1da13147b99e2c5";

const myHash1 = new CLAccountHash(
  CLPublicKey.fromHex(hexString1).toAccountHash()
);

const TOKEN_ADMIN = new CLKey(myHash1);

//**************************** for accounthash end*******************************/

//**************************** for kyc_package_has start*******************************/
const hexString2 =
  "98639837ea364e730d90138f902fb22c8bcc525ddeb568c2f0e85bf9af4c32f2";

const hex2 = Uint8Array.from(Buffer.from(hexString2, "hex"));

const TOKEN_kyc_package_hash = new CLKey(new CLByteArray(hex2));
//**************************** for kyc_package_has end*******************************/

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
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({
        name: TOKEN_NAME,
        symbol: TOKEN_SYMBOL,
        meta: TOKEN_META,
        admin: TOKEN_ADMIN,
        kyc_package_hash: TOKEN_kyc_package_hash,
        contract_name: TOKEN_contract_name,
      })
    ),
    DeployUtil.standardPayment(250000000000)
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
installed contract -> CASK
... account = ${constants.PATH_TO_SOURCE_KEYS}
... deploy chain = ${constants.DEPLOY_CHAIN_NAME}
... deploy dispatch node = ${constants.DEPLOY_NODE_ADDRESS}
... deploy gas payment = ${constants.DEPLOY_GAS_PAYMENT_FOR_INSTALL}
... deploy gas price = ${constants.DEPLOY_GAS_PRICE}
contract installation details:
... path = ${PATH_TO_CONTRACT}
... deploy hash = ${deployHash}
---------------------------------------------------------------------
    `);
};

main();
