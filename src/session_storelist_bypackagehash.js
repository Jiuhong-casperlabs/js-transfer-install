import {
  DeployUtil,
  CasperServiceByJsonRPC,
  RuntimeArgs,
  CLList,
  CLU8,
  CLString,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC(constants.DEPLOY_NODE_ADDRESS);

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_KV_KEYS
  );

  const contractPackageHash =
    "hash-f57c1cb4edf0cb71d76a2f629fb69e00d12332750ce89ce0d27f26cdf6245e81";
  const contractPackageHashAsByteArray = [
    ...Buffer.from(contractPackageHash.slice(5), "hex"),
  ];

  const myList = new CLList([new CLU8(1), new CLU8(2), new CLU8(3)]);

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredVersionContractByHash(
      contractPackageHashAsByteArray,
      null,
      "store_list_of_bytes",
      RuntimeArgs.fromMap({
        value: myList,
        name: new CLString("name"),
      })
    ),
    DeployUtil.standardPayment(
      constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
    )
  );

  //Step 5.2 Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);

  console.log(`store_tuple2 ${myList} 
   deploy hash = ${deployHash}`);
};

main();

//https://testnet.cspr.live/deploy/ec84ef900e5906d4e7e37fa318022baac4a5fc76b39e5379b4769b31d778dfa3
