import {
  DeployUtil,
  CasperServiceByJsonRPC,
  RuntimeArgs,
  CLU8,
  CLByteArray,
  CLOption,
  CLU8Type,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";
import { Some, None } from "ts-results";

const main = async () => {
  //Step 5: Invoke contract transfer endpoint.

  //Step 5.1 Set deploy

  // const PATH_TO_CONTRACTS = "/home/jh/rust/test63/contract/target/wasm32-unknown-unknown/release/contract.wasm";
  const PATH_TO_CONTRACTS =
    "/home/jh/mywork/multi-sign/target/wasm32-unknown-unknown/release/add_associated_key.wasm";

  // const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");
  // const client = new CasperServiceByJsonRPC("http://16.162.124.124:7777/rpc");
  const client = new CasperServiceByJsonRPC("http://94.130.10.55:7777/rpc");

  const hexString1 =
    "56befc13a6fd62e18f361700a5e08f966901c34df8041b36ec97d54d605c23de";

  // const myHash1 = new CLAccountHash(
  //   CLPublicKey.fromHex(hexString1).toAccountHash()
  // );

  const hash1 =
    "3880439f6910501f14b0492540559c9207354502ae9b52a51553641cb3617d3f";
  const myHash1 = new CLByteArray(
    Uint8Array.from(Buffer.from(hexString1, "hex"))
  );

  const token_ids = new CLOption(Some(new CLU8(1)));
  const token_ids1 = new CLOption(None, new CLU8Type());

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getSecp256k1KeyPairOfContract(
    // "/home/jh/casper-node/utils/nctl/assets/net-1/users/user-10"
    "/home/jh/keys/test12"
  );

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      // "casper-net-1",
      "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACTS),
      RuntimeArgs.fromMap({
        // "mycontract": contracthash,
        weight: new CLU8(1),
        account: myHash1,
        token_ids: token_ids,
        token_ids1: token_ids1,
      })
    ),
    DeployUtil.standardPayment(10000000000)
  );

  // Step 5.2 Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairOfContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();
