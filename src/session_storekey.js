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
  decodeBase16,
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

  const contractHashAsByteArray = decodeBase16(
    "d7f1479f51352eb51b83e5082f4549fc33c6dd49fe8b63471f881d14575eb12f"
  );

  const byteArr1 = new CLByteArray(
    new Uint8Array([
      21, 31, 41, 21, 31, 41, 21, 31, 41, 21, 31, 41, 21, 31, 41, 21, 31, 41,
      21, 31, 41, 21, 31, 41, 21, 31, 41, 21, 31, 41, 31, 41,
    ])
  );
  console.log("byteArr1 length: ", byteArr1.data.length);
  const myValue = new CLKey(byteArr1);

  let wallet =
    "01a018bf278f32fdb7b06226071ce399713ace78a28d43a346055060a660ba7aa9";
  let keyvalue = CLValueBuilder.key(
    CLValueBuilder.byteArray(CLPublicKey.fromHex(wallet).toAccountHash())
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
      "store_key",
      RuntimeArgs.fromMap({
        value: myValue,
        name: new CLString("name"),
        keyvalue: keyvalue,
      })
    ),
    DeployUtil.standardPayment(
      constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
    )
  );

  console.log("deploy is before sign: ", deploy);
  //Step 5.2 Sign deploy.
  deploy = client.signDeploy(deploy, keyPairofContract);

  console.log("deploy is after sign: ", deploy);
  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.putDeploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();

//https://testnet.cspr.live/deploy/ec84ef900e5906d4e7e37fa318022baac4a5fc76b39e5379b4769b31d778dfa3
