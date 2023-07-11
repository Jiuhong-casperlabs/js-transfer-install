/**
 * @fileOverview CSPR JS SDK demo: Native transfers.
 */

import _ from "lodash";
import {
  CasperServiceByJsonRPC,
  DeployUtil,
  CLURef,
  CLString,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Amount with which to fund each account.
const AMOUNT_TO_TRANSFER = 2500000000;

const main = async () => {
  //Step1: set casper node client
  // const client = new CasperServiceByJsonRPC("http://94.130.10.55:7777/rpc"); //casper-test
  const client = new CasperServiceByJsonRPC("http://52.35.59.254:7777/rpc"); //integration-test

  //step 2: Set source key pair
  //        Set target key pair
  const source = utils.getKeyPairOfContract(constants.PATH_TO_SOURCE_KEYS);
  const target = utils.getKeyPairOfContract(constants.PATH_TO_TRAGET_KEYS);

  // Set signingKeys
  const signingKeys = [
    utils.getKeyPairOfContract(constants.PATH_TO_SIGN_KEY1),
    utils.getKeyPairOfContract(constants.PATH_TO_SIGN_KEY2),
  ];

  //step 3: Invoke contract transfer endpoint
  //step 3.1 set deploy
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      source.publicKey,
      // "casper-net-1",
      "integration-test",
      // "casper-test",
      constants.DEPLOY_GAS_PAYMENT,
      86400000
    ),
    DeployUtil.ExecutableDeployItem.newTransfer(
      AMOUNT_TO_TRANSFER,
      target.publicKey,
      null,
      _.random()
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER)
  );

  console.log("deploy is ", Buffer.from(deploy.hash).toString("hex"));

  deploy = DeployUtil.addArgToDeploy(
    deploy,
    "deploy_type",
    new CLString("send")
  );

  deploy = DeployUtil.addArgToDeploy(
    deploy,
    "to_address",
    new CLString(
      "0202b7a55e2a713c60de23043cb167f8cb2c8acd6f7c0de093a441528efb26c981ae"
    )
  );

  //step 3.2 Sign Deploy
  for (let key of signingKeys) {
    console.log(`Signed by: ${key.publicKey.toAccountHashStr()}`);
    deploy = DeployUtil.signDeploy(deploy, key);
  }

  //ste 3.4 Dispatch deploy to node
  let deployHash = await client.deploy(deploy);

  console.log(
    `transferring ${AMOUNT_TO_TRANSFER} tokens -> user ${target} :: deploy hash = ${JSON.stringify(
      deployHash
    )}`
  );
};

main();
