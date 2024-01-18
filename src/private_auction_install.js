/**
 * @fileOverview CSPR JS SDK demo: CASK - install contract.
 */

import {
  CasperServiceByJsonRPC,
  DeployUtil,
  RuntimeArgs,
  CLString,
  CLByteArray,
  CLAccountHash,
  CLPublicKey,
  CLKey,
  CLList,
  CLOption,
  CLU64,
  CLU512,
  CLBoolType,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";
import { Some, None } from "ts-results";

// Path to contract to be installed.

const PATH_TO_CONTRACT = constants.PATH_TO_CONTRACT_AUCTION;

// Token parameters.
const myKey = new CLString("hello");
const myVal = new CLString("world");

//**************************** for token_contract_hash(CASK) start*******************************/
const hexString1 =
  "bF5Ccb2d64da103e1CBC1b62531d7BA9c0aDAC1753a23d96D3dF187C1D90C529";

const hex1 = Uint8Array.from(Buffer.from(hexString1, "hex"));

const token_contract_hash = new CLKey(new CLByteArray(hex1));
//**************************** for token_contract_hash(CASK) end*******************************/

//**************************** recipient*******************************/
const hexString2 = //jdk2
  "0125a6336791eba195c472a8b7dbcd256a6ecddf8863e586a3dfefe2581a5d672c";

const myHash2 = new CLAccountHash(
  CLPublicKey.fromHex(hexString2).toAccountHash()
);

const recipient = new CLKey(myHash2);
//**************************** recipient*******************************/

//**************************** token_ids*******************************/
const a = new CLString("orange");
const token_ids = new CLList([a]);
// const token_ids = new CLOption(Some(myList));
//**************************** token_ids*******************************/

//****************************beneficiary_account <Key>*********************/
const hexString3 = //jdk2
  "0125a6336791eba195c472a8b7dbcd256a6ecddf8863e586a3dfefe2581a5d672c";

const myHash3 = new CLAccountHash(
  CLPublicKey.fromHex(hexString3).toAccountHash()
);

const beneficiary_account = new CLKey(myHash3);
//****************************beneficiary_account <Key>*********************/

//****************************starting_price <Option<U512>>*********************/

const starting_price = new CLOption(None, new CLBoolType());

//****************************starting_price <Option<U512>>*********************/

//****************************reserve_price  <U512>*********************/

// const starting_price = new CLOption(new CLValueBuilder.u512(1));
const reserve_price = new CLU512(10);

//****************************reserve_price  <U512>*********************

//****************************token_id  String*********************/

const token_id = new CLString("orange");

//****************************token_id  String*********************/

//****************************start_time u64*********************/

const start_time = new CLU64("2641199115000");

//****************************start_time u64*********************/

//****************************cancellation_time u64*********************/

const cancellation_time = new CLU64("2641199315000");

//****************************cancellation_time u64*********************/

//****************************end_time u64*********************/

const end_time = new CLU64("2641299315000");

//****************************end_time u64*********************/

//****************************format String "English"*********************/

const format = new CLString("English");

//****************************format String "English"*********************/

const main = async () => {
  // Step 1: Set casper node client.
  const client = new CasperServiceByJsonRPC(constants.DEPLOY_NODE_ADDRESS);

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
        token_contract_hash: token_contract_hash,
        token_ids: token_ids,
        beneficiary_account: beneficiary_account,
        starting_price: starting_price,
        reserve_price: reserve_price,
        token_id: token_id,
        start_time: start_time,
        cancellation_time: cancellation_time,
        end_time: end_time,
        format: format,
      })
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_INSTALL)
  );

  // Step 4: Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairOfContract);

  // Step 5: Dispatch deploy to node.
  const deployHash = await client.deploy(deploy);

  // Step 6: Render deploy details.
  logDetails(deployHash);
};

/**
 * Emits to stdout deploy details.
 * @param {String} deployHash - Identifer of dispatched deploy.
 */
const logDetails = (deployHash) => {
  console.log(`
... deploy hash = ${deployHash}
---------------------------------------------------------------------
    `);
};

main();
