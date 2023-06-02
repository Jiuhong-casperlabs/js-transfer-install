import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLPublicKey,
  CLList,
  CLString,
  CLValueBuilder,
  CLByteArray,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient("https://rpc.testnet.casperlabs.io/rpc");

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    `${process.env.HOME}/keys/test1`
  );

  const constracthash_str =
    "hash-882c3602d564aa4900e321038162c0d9ed86a89b5ffb8371b1e3ead68b931e3c";
  const contractHashAsByteArray = [
    ...Buffer.from(constracthash_str.slice(5), "hex"),
  ];

  const hexString2 =
    "feed638f60f5a2840656d86e0e51dc62c092e79d980ba8dc281387dbb8f80c42";

  const hex2 = Uint8Array.from(Buffer.from(hexString2, "hex"));

  const runtimeArgs = RuntimeArgs.fromMap({
    spender: CLValueBuilder.key(
      CLValueBuilder.byteArray(
        CLPublicKey.fromHex(
          "012daabbb1808d7abf39bbdb05b9c8996c62b6debaf2605eeb6f206024051831c5"
        ).toAccountHash()
      )
    ),
    new_one: CLValueBuilder.key(new CLByteArray(hex2)),
    token_ids: new CLList([
      new CLString("6d2a5d89-572e-4906-9e31-8a018591937e"),
    ]),
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
