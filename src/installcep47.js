/**
 * @fileOverview CSPR JS SDK demo: ERC20 - install contract.
 */

import {
  CasperClient,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
  CLString,
  CLMap,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT = constants.PATH_TO_CONTRACT_ERC_20;

// Token parameters.

const TOKEN_NAME = "cep01";
const TOKEN_SYMBOL = "CEP-1";
const CONTRACT_NAME = "myceptest011";

/**
 * Demonstration entry point.
 */
const main = async () => {
  // Step 1: Set casper node client.
  const client = new CasperClient(" http://94.130.10.55:7777/rpc");

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getKeyPairOfContract("/home/jh/keys/test1");

  const myKey = new CLString("ice");
  const myVal = new CLString("cream");
  const meta = new CLMap([[myKey, myVal]]);

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({
        // let name: String = runtime::get_named_arg("name");
        // let symbol: String = runtime::get_named_arg("symbol");
        // let meta: Meta = runtime::get_named_arg("meta");
        // let contract_name: String = runtime::get_named_arg("contract_name");
        name: CLValueBuilder.string(TOKEN_NAME),
        symbol: CLValueBuilder.string(TOKEN_SYMBOL),
        meta: meta,
        contract_name: CLValueBuilder.string(CONTRACT_NAME),
      })
    ),
    DeployUtil.standardPayment(2)
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
installed contract -> CEP47
... deploy hash = ${deployHash}
---------------------------------------------------------------------
    `);
};

main();
