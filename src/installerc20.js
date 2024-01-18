/**
 * @fileOverview CSPR JS SDK demo: ERC20 - install contract.
 */

import {
  CasperServiceByJsonRPC,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT = constants.PATH_TO_CONTRACT_ERC_20;

// Token parameters.
const TOKEN_NAME = "Acme Token";
const TOKEN_SYMBOL = "ACME";
const TOKEN_DECIMALS = 11;
const TOKEN_SUPPLY = 1e15;

/**
 * Demonstration entry point.
 */
const main = async () => {
  // Step 1: Set casper node client.
  // const client = new CasperServiceByJsonRPC(
  //   "https://rpc.integration.casperlabs.io"
  // );
  // const client = new CasperServiceByJsonRPC("http://94.130.10.55:7777/rpc");
  const client = new CasperServiceByJsonRPC("http://94.130.10.55:7777/rpc");

  // Step 2: Set contract operator key pair.
  // const keyPairOfContract = utils.getKeyPairOfContract(
  //   "/home/jh/casper-node/utils/nctl/assets/net-1/faucet"
  // );
  const keyPairOfContract = utils.getKeyPairOfContract("/home/jh/keys/test1");

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      // "casper-net-1",
      "casper-test",
      // "integration-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({
        decimals: CLValueBuilder.u8(TOKEN_DECIMALS),
        name: CLValueBuilder.string(TOKEN_NAME),
        symbol: CLValueBuilder.string(TOKEN_SYMBOL),
        total_supply: CLValueBuilder.u256(TOKEN_SUPPLY),
      })
    ),
    DeployUtil.standardPayment(200000000000)
  );

  // Step 4: Sign deploy.
  // deploy = DeployUtil.signDeploy(deploy, keyPairOfContract);
  // deploy = DeployUtil.signDeploy(deploy, keyPairOfContract);

  // Step 5: Dispatch deploy to node.
  // const deployHash = await client.deploy(deploy);
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
---------------------------------------------------------------------
installed contract -> ERC20
... account = ${constants.PATH_TO_SOURCE_KEYS}
... deploy chain = ${constants.DEPLOY_CHAIN_NAME}
... deploy dispatch node = ${constants.DEPLOY_NODE_ADDRESS}
... deploy gas payment = ${constants.DEPLOY_GAS_PAYMENT_FOR_INSTALL}
... deploy gas price = ${constants.DEPLOY_GAS_PRICE}
contract constructor args:
... token symbol = ${TOKEN_SYMBOL}
... token name = ${TOKEN_NAME}
... token supply = ${TOKEN_SUPPLY}
... token decimals = ${TOKEN_DECIMALS}
contract installation details:
... path = ${PATH_TO_CONTRACT}
... deploy hash = ${deployHash}
---------------------------------------------------------------------
    `);
};

main();
