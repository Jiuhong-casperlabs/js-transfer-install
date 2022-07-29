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
  CasperServiceByJsonRPC,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT = constants.PATH_TO_CONTRACT_ACCOUNT_ACCESS;

//test99
const pk1String1 =
  "010e31a03ea026a8e375653573e0120c8cb96699e6c9721ae1ea98f896e6576ac3";
const pk1 = CLPublicKey.fromHex(pk1String1);

// test98
const pk2String2 =
  "01bed05482905c4a7f47837aeffbde82df64abc1ab2b64519b638de81c8c7d4f58";
const pk2 = CLPublicKey.fromHex(pk2String2);

const ACCOUNT_PUBKEYS = new CLList([pk1, pk2]);

/**
 * Demonstration entry point.
 */
const main = async () => {
  // Step 1: Set casper node client.

  let client = new CasperServiceByJsonRPC("http://3.139.47.90:7777/rpc");
  let result = await client.getBlockInfoByHeight(2000);
  console.log("result is: ", result);
};

main();
