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
    "hash-8a86d5078527567014dd78f7d3a670b062ac2dc0fbcf142ddd6551d85c61b907";
  const contractHashAsByteArray = [
    ...Buffer.from(constracthash_str.slice(5), "hex"),
  ];

  const targetcontract = new CLString(
    "contract-9e91c68f5e1b8c020a056f037dc669dc1d5a385ff7bf7594587fd2cefca8ff71"
  );

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "callcontract",
      RuntimeArgs.fromMap({
        targethash: targetcontract,
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
