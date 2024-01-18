import {
  DeployUtil,
  CasperServiceByJsonRPC,
  RuntimeArgs,
  CLByteArray,
  CLList,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

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
  const hash1 =
    "e8d77107262fc5ae787662dc418cf01f36394a4d4ec417230dcac66c4afb0744e4d7d120735c3be7517750f53f22ac60b9dee22b05ab9775cf7e15406e9cc708";
  const hex = new CLByteArray(Uint8Array.from(Buffer.from(hash1, "hex")));

  // 0707070707070707070707070707070707070707070707070707070707070707
  const group_key_str =
    "8cf71022d8a4240c486d8653fbf31de4b7748ef3c1477b728d3eb1e7d307f1b2";
  const group_key = new CLByteArray(
    Uint8Array.from(Buffer.from(group_key_str, "hex"))
  );

  // 0808080808080808080808080808080808080808080808080808080808080808
  const fee_public_key_str =
    "0be6e84e1011ed08d58a0650043bb3ece261ec06e8a84c37984d187227438194";
  const fee_public_key = new CLByteArray(
    Uint8Array.from(Buffer.from(fee_public_key_str, "hex"))
  );

  // 0909090909090909090909090909090909090909090909090909090909090909
  const whitecontract_str =
    "036d5da0cbd206615617d190ddb41d34abd6c51b1ef9273611ca7e5c463ceaf2";
  const whitecontract = new CLByteArray(
    Uint8Array.from(Buffer.from(whitecontract_str, "hex"))
  );
  const whitelist = new CLList([whitecontract]);

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-net-1",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "init",
      RuntimeArgs.fromMap({
        group_key,
        fee_public_key,
        whitelist,
      })
    ),
    DeployUtil.standardPayment(300000000000)
  );

  // console.log("deploy is before sign: ",deploy)
  //Step 5.2 Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  // console.log("deploy is after sign: ",deploy)
  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();

//https://testnet.cspr.live/deploy/ec84ef900e5906d4e7e37fa318022baac4a5fc76b39e5379b4769b31d778dfa3
