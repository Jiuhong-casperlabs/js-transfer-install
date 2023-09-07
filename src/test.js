import {
  DeployUtil,
  RuntimeArgs,
  CLPublicKey,
  CasperServiceByJsonRPC,
  CLByteArray,
  CLValueBuilder,
  CLAccountHash,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  // const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");
  const client = new CasperServiceByJsonRPC(
    "https://rpc.testnet.casperlabs.io/rpc"
  );
  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(`/home/jh/keys/test1`);

  //
  // --session-arg "group_key:account_hash='account-hash-8cf71022d8a4240c486d8653fbf31de4b7748ef3c1477b728d3eb1e7d307f1b2'"  \

  // public key
  const hexString1 =
    "010e31a03ea026a8e375653573e0120c8cb96699e6c9721ae1ea98f896e6576ac3";

  // account hash
  const myHash1 = new CLAccountHash(
    CLPublicKey.fromHex(hexString1).toAccountHash()
  );

  const account = CLValueBuilder.key(myHash1);

  const PATH_TO_CONTRACT = `/home/jh/rust/test113/contract/target/wasm32-unknown-unknown/release/contract.wasm`;

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({
        account,
      })
    ),
    DeployUtil.standardPayment(300000000000)
  );

  //Step 5.2 Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log("deployHash", deployHash);
};

main();
