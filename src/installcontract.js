import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLList,
  CLU8,
  CLString,
  CLByteArray
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {

  //Step 5: Invoke contract transfer endpoint.

  //Step 5.1 Set deploy
  

  // const PATH_TO_CONTRACTS = "/home/jh/rust/test63/contract/target/wasm32-unknown-unknown/release/contract.wasm";
  const PATH_TO_CONTRACTS = "/home/jh/rust/test72/contract/target/wasm32-unknown-unknown/release/contract.wasm";


  const hash1 = "09d429a0e282d55a0d0daa56f5e117f928bf107e27373152757307ada3f999d7"
  const contracthash = new CLByteArray(Uint8Array.from(Buffer.from(hash1, 'hex')));

  const client = new CasperClient("http://localhost:11101/rpc");

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getKeyPairOfContract(
    "/home/jh/casper-node/utils/nctl/assets/net-1/faucet"
  );

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      "casper-net-1",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACTS),
      RuntimeArgs.fromMap({
        // "mycontract": contracthash,
      })
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_INSTALL)
  );


  //Step 5.2 Sign deploy.
  deploy = client.signDeploy(deploy, keyPairOfContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.putDeploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();