import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLAccountHash,
  CLPublicKey,
  CLValueParsers,
  CLByteArray,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 5: Invoke contract transfer endpoint.

  //Step 5.1 Set deploy

  // const PATH_TO_CONTRACTS = "/home/jh/rust/test63/contract/target/wasm32-unknown-unknown/release/contract.wasm";
  const PATH_TO_CONTRACTS =
    "/home/jh/mywork/contractsworkspace/target/wasm32-unknown-unknown/release/accounthash.wasm";

  const client = new CasperClient("http://localhost:11101/rpc");
  // const client = new CasperClient("http://16.162.124.124:7777/rpc");

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getKeyPairOfContract(
    "/home/jh/casper-node/utils/nctl/assets/net-1/users/user-10"
    // "/home/jh/keys/test1"
  );
  const hexString3 =
    "2cf005e094132CdF34B6CeA904Ce1F7A4Cfa4F4b532fcc47710FF04473E11087";

  const hex3 = Uint8Array.from(Buffer.from(hexString3, "hex"));
  const hash3 = new CLByteArray(hex3);

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      "casper-net-1",
      // "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACTS),
      RuntimeArgs.fromMap({
        myaccounthash: hash3,
      })
    ),
    DeployUtil.standardPayment(10000000000)
  );

  //Step 5.2 Sign deploy.
  deploy = client.signDeploy(deploy, keyPairOfContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.putDeploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();
