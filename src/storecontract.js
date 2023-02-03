import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLValueBuilder,
  CLPublicKey,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 5: Invoke contract transfer endpoint.

  //Step 5.1 Set deploy

  // const PATH_TO_CONTRACTS = "/home/jh/rust/test63/contract/target/wasm32-unknown-unknown/release/contract.wasm";
  const PATH_TO_CONTRACTS =
    "/home/jh/rust/test75/contract/target/wasm32-unknown-unknown/release/contract.wasm";

  const wallet1str =
    "0152836c51eac04205bb7febe9d92da50758178b0bf388bd03e1da13147b99e2c5";
  const wallet1 = CLValueBuilder.key(
    CLValueBuilder.byteArray(CLPublicKey.fromHex(wallet1str).toAccountHash())
  );

  const wallet2 = CLValueBuilder.byteArray(
    CLPublicKey.fromHex(wallet1str).toAccountHash()
  );

  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getKeyPairOfContract(
    constants.PATH_TO_CEP47_KEYS
  );

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACTS),
      RuntimeArgs.fromMap({
        wallet1: wallet1,
        wallet2: wallet2,
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
