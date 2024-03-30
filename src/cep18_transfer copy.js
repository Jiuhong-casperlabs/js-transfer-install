import {
  RuntimeArgs,
  CasperServiceByJsonRPC,
  DeployUtil,
  CLPublicKey,
  CLKey,
  CLAccountHash,
  CLU256,
  Keys,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

async function tokenTransfer() {
  const fromKey = "";
  const to =
    "020221fc066e8868affea2b71baf3fd1fa1fc745887ee35cdb83d5ce6745d3ff9bbb";
  const SHIBOO =
    "4d7c5ece0a0dfeea697e6e79cbc9d75d589f2046dff701f944295f630825bd3d";
  const parsePrivateKey = Buffer.from(fromKey, "hex");
  const publicKey = Keys.Ed25519.privateToPublicKey(parsePrivateKey);
  const keyPair = Keys.Ed25519.parseKeyPair(publicKey, parsePrivateKey);
  const deployParams = new DeployUtil.DeployParams(keyPair.publicKey, "casper");
  const entryPoint = "transfer";
  const args = {
    recipient: new CLKey(
      new CLAccountHash(CLPublicKey.fromHex(to).toAccountHash())
    ),
    amount: new CLU256(10000000000000000n),
  };
  const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
    decodeBase16(SHIBOO),
    entryPoint,
    args
  );
  const payment = DeployUtil.standardPayment(100000000);
  const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
  const signedDeploy = client.signDeploy(deploy, keyPair);
  const txHash = await client.putDeploy(signedDeploy);
  console.log("txHash: " + txHash);
}

tokenTransfer()
  .catch(console.error)
  .finally(() => process.exit());
