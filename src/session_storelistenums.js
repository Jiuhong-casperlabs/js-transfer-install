import {
  CasperClient,
  CLList,
  CLString,
  CLBool,
  CLOption,
  CLBoolType,
  CLStringType,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";
import { Some, None } from "ts-results";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_KV_KEYS
  );

  //Step3: Query node for global state root hash
  const stateRootHash = await utils.getStateRootHash(client);

  //Step4: Query node for contract hash
  // const contractHash = await utils.getAccountNamedKeyValue(
  //   client,
  //   stateRootHash,
  //   keyPairofContract,
  //   "listkeys"
  // );
  // const contractHashAsByteArray = [
  //   ...Buffer.from(contractHash.slice(5), "hex"),
  // ];
  const myValue1 = new CLOption(Some(new CLString("helloworld")));
  const myValue2 = new CLOption(None, new CLStringType());
  const myValue3 = new CLOption(Some(new CLBool(true)));
  const myValue4 = new CLOption(None, new CLBoolType());
  const myList = new CLList([myValue1, myValue2, myValue3, myValue4]);
  console.log(myList);

  // let deploy = DeployUtil.makeDeploy(
  //   new DeployUtil.DeployParams(
  //     keyPairofContract.publicKey,
  //     constants.DEPLOY_CHAIN_NAME,
  //     constants.DEPLOY_GAS_PRICE,
  //     constants.DEPLOY_TTL_MS
  //   ),
  //   DeployUtil.ExecutableDeployItem.newStoredContractByHash(
  //     contractHashAsByteArray,
  //     "test",
  //     // "counter_inc",
  //     RuntimeArgs.fromMap({
  //       hello: myList,
  //     })
  //   ),
  //   DeployUtil.standardPayment(
  //     constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
  //   )
  // );

  // //Step 5.2 Sign deploy.
  // deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  // //Step 5.3 Dispatch deploy to node.
  // let deployHash = await client.deploy(deploy);

  // console.log(`store_list ${myList}
  //  deploy hash = ${deployHash}`);
};

main();

//https://testnet.cspr.live/deploy/ec84ef900e5906d4e7e37fa318022baac4a5fc76b39e5379b4769b31d778dfa3
