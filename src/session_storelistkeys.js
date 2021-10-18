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
  CLURef,
  AccessRights,
  decodeBase16
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

  //Step3: Query node for global state root hash
  const stateRootHash = await utils.getStateRootHash(client);

  //Step4: Query node for contract hash
  const contractHash = await utils.getAccountNamedKeyValue(
    client,
    stateRootHash,
    keyPairofContract,
    "counter"
  );
  const contractHashAsByteArray = [
    ...Buffer.from(contractHash.slice(5), "hex"),
  ];


  // const byteArr1 = new CLByteArray(new Uint8Array([21, 31]));
  // const myKey1 = new CLKey(byteArr1);

  // const byteArr2 = new CLByteArray(new Uint8Array([21, 31]));
  // const myKey2 = new CLKey(byteArr2);

  const hash = new CLAccountHash(Uint8Array.from(Array(32).fill(42)));
  const myKey1 = new CLKey(hash);

  const urefAddr =
      '2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a';
  const uref = new CLURef(
    decodeBase16(urefAddr),
    AccessRights.READ_ADD_WRITE
  );
  const myKey2 = new CLKey(uref);

  const myList = new CLList([myKey1, myKey2])


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
      RuntimeArgs.fromMap({
        hello: myList,
        // name: new CLString('name'),
      })
    ),
    DeployUtil.standardPayment(
      constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
    )
  );

  //Step 5.2 Sign deploy.
  deploy = client.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.putDeploy(deploy);

  console.log(`store_tuple2 ${myList} 
   deploy hash = ${deployHash}`);
};

main();

//https://testnet.cspr.live/deploy/ec84ef900e5906d4e7e37fa318022baac4a5fc76b39e5379b4769b31d778dfa3
