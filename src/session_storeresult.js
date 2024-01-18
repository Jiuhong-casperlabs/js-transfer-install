import {
  DeployUtil,
  CasperServiceByJsonRPC,
  RuntimeArgs,
  CLString,
  CLResult,
  CLStringType,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";
import { Ok, Err } from "ts-results";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC(constants.DEPLOY_NODE_ADDRESS);

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
  //   // "kvstorage_session"
  //   // "counter"
  //   "kvstorage_contract"
  // );

  const contractHash =
    "hash-d8afDa72C273c06427c03b6FEC5fB87BD3033FaAA72270902775CFf9Aa843350";
  const contractHashAsByteArray = [
    ...Buffer.from(contractHash.slice(5), "hex"),
  ];

  const myTypes = { ok: new CLStringType(), err: new CLStringType() };
  const myOkRes = new CLResult(Ok(new CLString("helloworld")), myTypes);
  const myErrRes = new CLResult(
    Err(new CLString("errorabouthelloworld")),
    myTypes
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
      "store_result",
      RuntimeArgs.fromMap({
        name: new CLString("name"),
        value: myOkRes,
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

  console.log(`deploy hash = ${deployHash}`);
};

main();

//https://testnet.cspr.live/deploy/ec84ef900e5906d4e7e37fa318022baac4a5fc76b39e5379b4769b31d778dfa3
