import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLList,
  CLU8,
  CLString,
  CLPublicKey,
  CLByteArray,
  CLKey,
  CLAccountHash,
  CLValueBuilder,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_SOURCE_KEYS
  );

  const constracthash_str =
    "hash-c9afc7c6af893614f81bb5a668e029c9161c24c33f8b475c7ea951f345a96e5d";
  const contractHashAsByteArray = [
    ...Buffer.from(constracthash_str.slice(5), "hex"),
  ];

  // const hash1 = "8e5c039cecd50b920b8f51c80183a738cae248cc04f1e899efcc89d21f6dbacc"
  const hash1 =
    "03a36a4a822baffe14fa84828b1f7c1bc30651361bec074a96f78f2407a30dc8";
  const hex = new CLByteArray(Uint8Array.from(Buffer.from(hash1, "hex")));

  const targetcontract = new CLString(
    "contract-9e91c68f5e1b8c020a056f037dc669dc1d5a385ff7bf7594587fd2cefca8ff71"
  );

  //**************************** for accounthash start*******************************/
  const hexString1 =
    "010e31a03ea026a8e375653573e0120c8cb96699e6c9721ae1ea98f896e6576ac3";

  const myHash1 = new CLAccountHash(
    CLPublicKey.fromHex(hexString1).toAccountHash()
  );

  const address = new CLKey(myHash1);

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "check_balance_of",
      RuntimeArgs.fromMap({
        token_contract: hex,
        address: address,
      })
    ),
    DeployUtil.standardPayment(
      constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
    )
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
