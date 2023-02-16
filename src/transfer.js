/**
 * @fileOverview CSPR JS SDK demo: Native transfers.
 */

import _ from "lodash";
import { CasperClient, DeployUtil, CLPublicKey } from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Amount with which to fund each account.
const AMOUNT_TO_TRANSFER = 2500000000;

const main = async () => {
  //Step1: set casper node client
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  //step 2: Set source key pair
  //        Set target key pair
  const source = utils.getKeyPairOfContract(constants.PATH_TO_SOURCE_KEYS);
  const hexString1 =
    "02032f2eac2b4b5d5a4129612be91aca6a0adaf8e5785719519d8c7bcf6d0617a997";
  const target_pk = CLPublicKey.fromHex(hexString1);

  //step 3: Invoke contract transfer endpoint
  //step 3.1 set deploy
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      source.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PAYMENT,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newTransfer(
      AMOUNT_TO_TRANSFER,
      target_pk,
      null,
      _.random()
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER)
  );

  console.log("deploy is ", Buffer.from(deploy.hash).toString("hex"));

  //step 3.2 Sign Deploy
  deploy = client.signDeploy(deploy, source);
  // console.log("=====content for putdeploy============");
  // console.log("content for putdeploy is, ", JSON.stringify(deploy));
  // console.log("=====content for putdeploy============");
  //ste 3.4 Dispatch deploy to node
  let deployHash = await client.putDeploy(deploy);

  console.log(` deploy hash = ${deployHash}`);
};

main();
