import {
  DeployUtil,
  CasperServiceByJsonRPC,
  RuntimeArgs,
  CLList,
  CLString,
  CLPublicKey,
  CLPublicKeyTag,
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

  //Step3: Query node for global state root hash
  const stateRootHash = await utils.getStateRootHash(client);

  //Step4: Query node for contract hash
  const contractHash = await utils.getAccountNamedKeyValue(
    client,
    stateRootHash,
    keyPairofContract,
    "mykv"
    // "kvstorage_contract"
    // "counter"
  );
  const contractHashAsByteArray = [
    ...Buffer.from(contractHash.slice(5), "hex"),
  ];

  // const byteArr1 = new CLByteArray(new Uint8Array([21, 31]));
  // const myKey1 = new CLKey(byteArr1);

  const rawEd25519Account = Uint8Array.from([
    154, 211, 137, 116, 146, 249, 164, 57, 9, 35, 64, 255, 83, 105, 131, 86,
    169, 250, 100, 248, 12, 68, 201, 17, 43, 62, 151, 55, 158, 87, 186, 148,
  ]);

  const publicKeyEd25519 = new CLPublicKey(
    rawEd25519Account,
    CLPublicKeyTag.ED25519
  );

  const publickKey98 = utils.getKeyPairOfContract(
    constants.PATH_LIST_KEY98
  ).publicKey;

  const publickKey11 = utils.getKeyPairOfContract(
    constants.PATH_LIST_KEY11
  ).publicKey;

  const myList = new CLList([publicKeyEd25519, publickKey98, publickKey11]);

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "store_list_publickeys",
      // "counter_inc",
      RuntimeArgs.fromMap({
        name: new CLString("storelistpublickeys3"),
        value: myList,
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

  console.log(`store_list_publickeys ${myList} 
   deploy hash = ${deployHash}`);
};

main();

//https://testnet.cspr.live/deploy/ec84ef900e5906d4e7e37fa318022baac4a5fc76b39e5379b4769b31d778dfa3
