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

  // cep78
  const constracthash_str =
    "hash-186920323eff953a3897d9e5518daf58e74c47c0b71a016e495c9f36579c36c4";
  const contractHashAsByteArray = [
    ...Buffer.from(constracthash_str.slice(5), "hex"),
  ];

  //xp
  const hash4 =
    "5927606db903f1825e57f7c4aadb971434615fe5b84464798a8e55fd9205d10f";
  const contract_whitelist = new CLList([
    new CLByteArray(Uint8Array.from(Buffer.from(hash4, "hex"))),
  ]);

  const runtimeArgs = RuntimeArgs.fromMap({
    contract_whitelist,
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
      "set_variables",
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
