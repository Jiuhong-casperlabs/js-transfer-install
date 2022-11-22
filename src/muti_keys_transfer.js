/**
 * @fileOverview CSPR JS SDK demo: Native transfers.
 */

import _ from "lodash";
import { CasperClient, DeployUtil, CLURef } from "casper-js-sdk";
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
  const target = utils.getKeyPairOfContract(constants.PATH_TO_TRAGET_KEYS);

  // Set signingKeys
  const signingKeys = [
    utils.getKeyPairOfContract(constants.PATH_TO_SIGN_KEY1),
    utils.getKeyPairOfContract(constants.PATH_TO_SIGN_KEY2),
  ];

  console.log("source:", source.publicKey.data);
  // console.log("targe:", target);

  //step 3: Invoke contract transfer endpoint
  //step 3.1 set deploy
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      source.publicKey,
      "casper-net-1",
      constants.DEPLOY_GAS_PAYMENT,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newTransfer(
      AMOUNT_TO_TRANSFER,
      target.publicKey,
      CLURef.fromFormattedStr(
        "uref-78618f20cdf2d3335839db86e9f6642da8511be2c1b7b48baff36910c810b126-007"
      ),
      _.random()
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER)
  );

  console.log("deploy is ", Buffer.from(deploy.hash).toString("hex"));

  // async function sendDeploy(deploy, signingKeys) {
  //   for(let key of signingKeys){
  //       console.log(`Signed by: ${key.publicKey.toAccountHashStr()}`);
  //       deploy = client.signDeploy(deploy, key);
  //   }
  //   const deployHash = await client.putDeploy(deploy);
  //   await printDeploy(deployHash);
  // }

  //step 3.2 Sign Deploy
  for (let key of signingKeys) {
    console.log(`Signed by: ${key.publicKey.toAccountHashStr()}`);
    deploy = client.signDeploy(deploy, key);
  }
  // deploy = client.signDeploy(deploy, source);
  // console.log("=====content for putdeploy============");
  // console.log("content for putdeploy is, ", JSON.stringify(deploy));
  // console.log("=====content for putdeploy============");
  //ste 3.4 Dispatch deploy to node
  let deployHash = await client.putDeploy(deploy);

  console.log(
    `transferring ${AMOUNT_TO_TRANSFER} tokens -> user ${target} :: deploy hash = ${deployHash}`
  );
};

main();
