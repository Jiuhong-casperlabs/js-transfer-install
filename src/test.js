import { DeployUtil, CasperClient, RuntimeArgs, CLString } from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  // const client = new CasperClient("https://rpc.testnet.casperlabs.io/rpc");
  const client = new CasperClient("http://85.114.132.133:7777/rpc");
  // const client = new CasperClient("http://159.69.76.171:7777/rpc");

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    `${process.env.HOME}/keys/test1`
  );

  const constracthash_str =
    "hash-882c3602d564aa4900e321038162c0d9ed86a89b5ffb8371b1e3ead68b931e3c";
  const contractHashAsByteArray = [
    ...Buffer.from(constracthash_str.slice(5), "hex"),
  ];

  const runtimeArgs = RuntimeArgs.fromMap({
    token_ids: new CLString("6d2a5d89"),
  });
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "counter_inc",
      runtimeArgs
    ),
    DeployUtil.standardPayment(300000000)
  );

  //Step 5.2 Sign deploy.
  deploy = client.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.putDeploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();
