/**
 * @fileOverview CSPR JS SDK demo: CASK - install contract.
 */
import _ from "lodash";
import { CasperClient, DeployUtil, CLU64 } from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

/**
 * Demonstration entry point.
 */
// Amount with which to fund each account.
const AMOUNT_TO_TRANSFER = 2500000000;

const main = async () => {
  //Step1: set casper node client
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  //step 2: Set source key pair
  //        Set target key pair
  const source = utils.getKeyPairOfContract(constants.PATH_TO_SOURCE_KEYS);
  const target = utils.getKeyPairOfContract(constants.PATH_TO_TRAGET_KEYS);

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

  // Step 4: setSignature
  const signature = source.sign(deploy.hash);
  deploy = DeployUtil.setSignature(deploy, signature, source.publicKey);

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
