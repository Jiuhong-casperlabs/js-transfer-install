import {
  DeployUtil,
  CasperServiceByJsonRPC,
  decodeBase16,
  Keys,
  CLKey,
  CLAccountHash,
  CLU256,
  CLPublicKey,
  RuntimeArgs,
} from "casper-js-sdk";
import * as constants from "../constants";

const pathToFaucet = `/home/jh/keys/test1`;

const keyPairofContract = Keys.Ed25519.loadKeyPairFromPrivateFile(
  `${pathToFaucet}/secret_key.pem`
);

const main = async () => {
  const to =
    "020221fc066e8868affea2b71baf3fd1fa1fc745887ee35cdb83d5ce6745d3ff9bbb";
  const SHIBOO =
    "32cdc13a3ba05784f9ed45f07a81a0fd015cafbdff8246759903bb8f7f564d8d";

  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC(
    "https://rpc.testnet.casperlabs.io/rpc"
  );

  //Step 2: Set contract operator key pair

  const entryPoint = "transfer";
  const args = {
    recipient: new CLKey(
      new CLAccountHash(CLPublicKey.fromHex(to).toAccountHash())
    ),
    amount: new CLU256("10000000000000000"),
  };
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      decodeBase16(SHIBOO),
      entryPoint,
      RuntimeArgs.fromMap(args)
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
