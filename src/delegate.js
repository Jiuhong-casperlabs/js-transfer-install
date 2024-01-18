import {
  DeployUtil,
  CasperServiceByJsonRPC,
  RuntimeArgs,
  CLU512,
  CLPublicKey,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const AMOUNT_TO_DELEGATE = 500000000000;
const DEPLOY_GAS_PAYMENT = 100000000000;
const PATH_TO_CONTRACT =
  "/home/jh/casper-node/target/wasm32-unknown-unknown/release/delegate.wasm";
const PATH_TO_DELEGATOR_KEY =
  "/home/jh/casper-node/utils/nctl/assets/net-1/users/user-10";
const DEPLOY_NODE_ADDRESS = "http://localhost:11101/rpc";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC(DEPLOY_NODE_ADDRESS);

  //Step 2: Set contract operator key pair
  const keyPairOfDelegator = utils.getKeyPairOfContract(PATH_TO_DELEGATOR_KEY);

  const pkString =
    "016a035dfd525228ade37016bb2923639e6caa75ab80932cc71c176c96f91cc7ad";
  const validator = CLPublicKey.fromHex(pkString);

  // Step 3.1: Set deploy.
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfDelegator.publicKey,
      "casper-net-1",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({
        amount: new CLU512(AMOUNT_TO_DELEGATE),
        delegator: keyPairOfDelegator.publicKey,
        validator: validator,
      })
    ),
    DeployUtil.standardPayment(DEPLOY_GAS_PAYMENT)
  );

  // Step 3.2: Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairOfDelegator);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();
