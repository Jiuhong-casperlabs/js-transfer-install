import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLMap,
  CLAccountHash,
  CLBool,
  CLKey,decodeBase16
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const AMOUNT_TO_DELEGATE = 500000000000;
const DEPLOY_GAS_PAYMENT = 100000000000;
const PATH_TO_CONTRACT =
  "/home/jh/casper-node/target/wasm32-unknown-unknown/release/undelegate.wasm";
const PATH_TO_KEY =
  "/home/jh/mywork/js-transfer-install/test0";
const DEPLOY_NODE_ADDRESS = "http://44.234.104.105:7777/rpc";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient(DEPLOY_NODE_ADDRESS);

  //Step 2: Set contract operator key pair
  const keyPairOfDelegator = utils.getKeyPairOfContract(PATH_TO_KEY);
  const contractHash = "df0e0583e47daa23327f7ecab2ee67985527559b84dd4f49ad252003d6b7d69a"
  const mymap = new CLMap([
    [new CLKey(CLAccountHash.fromFormattedString(
      'account-hash-7d18ff4673261bc5295fdc6640de169a5491ff9fe2d776f177d46a4dae1c3f9e'
    )), new CLBool(true)],
    [new CLKey(CLAccountHash.fromFormattedString(
      'account-hash-daa579cf0871337cb4f670afb2cecbe52a28cdaa3346f0ab300609168e7e4ea4'
    )), new CLBool(true)],
    [new CLKey(CLAccountHash.fromFormattedString(
      'account-hash-df4005315c83abef1275550632fc282a4aa6e80c8a64af23ca9a5c1d21256ee6'
    )), new CLBool(true)],
  ]);
  // Step 3.1: Set deploy.
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfDelegator.publicKey,
      "casper-jiuhong-test-jh",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    // let event_on: bool = get_named_arg(EVENTS);
    // let revert_on: bool = get_named_arg(REVERT);
    // let keys: BTreeMap<Key, bool> = get_named_arg(USER_KEY_MAP);
    DeployUtil.ExecutableDeployItem.newStoredVersionContractByHash(
      decodeBase16(contractHash),null, "migrate_user_balance_keys",
      RuntimeArgs.fromMap({
        events: new CLBool(true),
        revert: new CLBool(true),
        user_key_map: mymap,
      })
    ),
    DeployUtil.standardPayment(DEPLOY_GAS_PAYMENT)
  );

  // Step 3.2: Sign deploy.
  deploy = client.signDeploy(deploy, keyPairOfDelegator);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.putDeploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();
