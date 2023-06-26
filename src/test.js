import {
  DeployUtil,
  RuntimeArgs,
  CLList,
  CasperServiceByJsonRPC,
  CLByteArray,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    `/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1`
  );

  //
  // --session-arg "group_key:account_hash='account-hash-8cf71022d8a4240c486d8653fbf31de4b7748ef3c1477b728d3eb1e7d307f1b2'"  \
  const hash2 =
    "8cf71022d8a4240c486d8653fbf31de4b7748ef3c1477b728d3eb1e7d307f1b2";
  const group_key = new CLByteArray(Uint8Array.from(Buffer.from(hash2, "hex")));
  // --session-arg "fee_public_key:account_hash='account-hash-0be6e84e1011ed08d58a0650043bb3ece261ec06e8a84c37984d187227438194'"  \
  const hash3 =
    "0be6e84e1011ed08d58a0650043bb3ece261ec06e8a84c37984d187227438194";
  const fee_public_key = new CLByteArray(
    Uint8Array.from(Buffer.from(hash3, "hex"))
  );
  //
  // cep78 => whitelist list
  const hash4 =
    "186920323eff953a3897d9e5518daf58e74c47c0b71a016e495c9f36579c36c4";
  const whitelist = new CLList([
    new CLByteArray(Uint8Array.from(Buffer.from(hash4, "hex"))),
  ]);

  //
  //xp
  const constracthash_str =
    "hash-5927606db903f1825e57f7c4aadb971434615fe5b84464798a8e55fd9205d10f";
  const contractHashAsByteArray = [
    ...Buffer.from(constracthash_str.slice(5), "hex"),
  ];

  const runtimeArgs = RuntimeArgs.fromMap({
    group_key,
    fee_public_key,
    whitelist,
  });
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
      runtimeArgs
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
