/**
 * @fileOverview CSPR JS SDK demo: CASK - install contract.
 */

import {
  DeployUtil,
  RuntimeArgs,
  CasperServiceByJsonRPC,
  CLPublicKey,
  CLList,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT =
  "/home/jh/mywork/accountsaccess/contract/target/wasm32-unknown-unknown/release/contract.wasm";

//user=2
const pk1String1 =
  "01d0ee8f3827c8b28817e5d3a02a8041b6c488e5880dab0d56d904f3f3356fcd9c";
const pk1 = CLPublicKey.fromHex(pk1String1);

// user=3
const pk2String2 =
  "012108a170b4e14ddc9b3d7872779d07f5c9d3268fe5f5363f9e10c4af1880e5ae";
const pk2 = CLPublicKey.fromHex(pk2String2);

const ACCOUNT_PUBKEYS = new CLList([pk1, pk2]);

/**
 * Demonstration entry point.
 */
const main = async () => {
  // Step 1: Set casper node client.
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getKeyPairOfContract(
    "/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1"
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
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({
        pks: ACCOUNT_PUBKEYS,
      })
    ),
    DeployUtil.standardPayment(100000000000)
  );

  // Step 4: Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairOfContract);

  // Step 5: Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log(`deploy hash = ${JSON.stringify(deployHash)}`);
};

main();
