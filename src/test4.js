import { RuntimeArgs, CasperServiceByJsonRPC, DeployUtil } from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT =
  "/home/jh/rust/testnana/contract/target/wasm32-unknown-unknown/release/contract.wasm";

const main = async () => {
  // Step 1: Set casper node client.
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  const keyPairofContract = utils.getKeyPairOfContract(
    `/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1`
  );

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({})
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_INSTALL)
  );

  // Step 4: Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  // Step 5: Dispatch deploy to node.
  const deployHash = await client.deploy(deploy);

  console.log(`deploy hash = ${JSON.stringify(deployHash)}`);
};

main();
