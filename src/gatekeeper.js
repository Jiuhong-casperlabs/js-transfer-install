import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLAccountHash,
  CLKey,
  CLPublicKey,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_KV_KEYS
  );

  //Step4: Query node for contract hash
  const contractHash =
    "hash-8c1e8b910a74f786d7798da4f08388d61ef5a03288fd110e8aca735498b09046";
  const contractHashAsByteArray = [
    ...Buffer.from(contractHash.slice(5), "hex"),
  ];

  const user =
    "01baf50300827417eac48130fd5ac517c44de399626c576e6b1ac5d6362f8e7c72";
  const userHash = new CLAccountHash(CLPublicKey.fromHex(user).toAccountHash());
  const userAccount = new CLKey(userHash);

  const runtimeArgs = RuntimeArgs.fromMap({
    gatekeeper: userAccount,
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
      "grant_gatekeeper",
      runtimeArgs
    ),
    DeployUtil.standardPayment(
      constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
    )
  );

  //Step 5.2 Sign deploy.
  deploy = client.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.putDeploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();
