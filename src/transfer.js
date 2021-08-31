/**
 * @fileOverview CSPR JS SDK demo: Native transfers.
 */

import _ from "lodash";
import { CasperClient, DeployUtil } from "casper-js-sdk";
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

  console.log("source:", source.publicKey.data);
  // console.log("targe:", target);

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
      target.publicKey,
      null,
      _.random()
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER)
  );

  //step 3.2 Sign Deploy
  deploy = client.signDeploy(deploy, source);

  //ste 3.4 Dispatch deploy to node
  // let deployHash = await client.putDeploy(deploy);

  // console.log(
  //   `transferring ${AMOUNT_TO_TRANSFER} tokens -> user ${target} :: deploy hash = ${deployHash}`
  // );
};

main();
