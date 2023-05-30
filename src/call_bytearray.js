import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLByteArray,
  CLU256,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient("http://localhost:11101/rpc");

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    `${process.env.HOME}/casper-node/utils/nctl/assets/net-1/users/user-1`
  );

  const constracthash_str =
    "hash-4b7991dbb700c99c4154211f2d0a80ba9325c98fcc67ab65f872a74bba29536f";
  const contractHashAsByteArray = [
    ...Buffer.from(constracthash_str.slice(5), "hex"),
  ];

  // const hash1 = "8e5c039cecd50b920b8f51c80183a738cae248cc04f1e899efcc89d21f6dbacc"
  // 0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a
  const hash1 =
    "e8d77107262fc5ae787662dc418cf01f36394a4d4ec417230dcac66c4afb0744e4d7d120735c3be7517750f53f22ac60b9dee22b05ab9775cf7e15406e9cc708";
  const hex = new CLByteArray(Uint8Array.from(Buffer.from(hash1, "hex")));

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-net-1",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "validate_pause",
      RuntimeArgs.fromMap({
        action_id: new CLU256(123),
        sig_data: hex,
      })
    ),
    DeployUtil.standardPayment(300000000000)
  );

  // console.log("deploy is before sign: ",deploy)
  //Step 5.2 Sign deploy.
  deploy = client.signDeploy(deploy, keyPairofContract);

  // console.log("deploy is after sign: ",deploy)
  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.putDeploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();

//https://testnet.cspr.live/deploy/ec84ef900e5906d4e7e37fa318022baac4a5fc76b39e5379b4769b31d778dfa3
