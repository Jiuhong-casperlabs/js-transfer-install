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
  CasperServiceByJsonRPC,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT =
  "/home/jh/caspereco/casper-nft-cep47/target/wasm32-unknown-unknown/release/cep47-token.wasm";

// Token parameters.

const TOKEN_NAME = "cep01";
const TOKEN_SYMBOL = "CEP-1";
const CONTRACT_NAME = "myceptest011";

/**
 * Demonstration entry point.
 */

const PATH_TO_KEY = "/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1";

const main = async () => {
  // Step 1: Set casper node client.
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getKeyPairOfContract(PATH_TO_KEY);

  const myKey = new CLString("ice");
  const myVal = new CLString("cream");
  const meta = new CLMap([[myKey, myVal]]);

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      "casper-net-1",
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
    DeployUtil.standardPayment(300000000000)
  );

  // Step 4: Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairOfContract);

  // Step 5: Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log("deployHash", deployHash);
};

main();
