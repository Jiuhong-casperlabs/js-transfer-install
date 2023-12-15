import {
  DeployUtil,
  CasperServiceByJsonRPC,
  RuntimeArgs,
  CLMap,
  CLString,
  CLList,
  CLKey,
  CLU256,
  CLPublicKey,
  CLAccountHash,
  decodeBase16,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const PATH_TO_KEY = "/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(PATH_TO_KEY);

  const contract_hash =
    "5980eae4c01d536a0db6de3ec3bec87d9d1b7887805e224e940e45227cc4d83c";

  const token_ids = new CLList([new CLU256(11)]);

  const token_meta1 = new CLMap([
    [new CLString("name"), new CLString("myNFT")],
    [new CLString("description"), new CLString("some text of myNFT")],
    [new CLString("image"), new CLString("some url")],
  ]);
  const token_metas = new CLList([token_meta1]);

  // {
  //   "key": "hash-5980eae4c01d536a0db6de3ec3bec87d9d1b7887805e224e940e45227cc4d83c",
  //   "transform": "WriteContract"
  // },
  // {
  //   "key": "hash-547759de44cb9b212f88eda8fbe9430de9c7dfe405f3f8eeb91d71c3f6d18eed",
  //   "transform": "WriteContractPackage"
  // },

  const hexString =
    "015cf35dbaa8133731dad5691dc70ec9c56011bf7339fd732797de7405c58b1d1e";
  const hash = CLPublicKey.fromHex(hexString).toAccountHash();

  const accounthash = new CLAccountHash(hash);
  const receipient = new CLKey(accounthash);
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      decodeBase16(contract_hash),
      "mint",
      RuntimeArgs.fromMap({
        recipient: receipient,
        token_ids: token_ids,
        token_metas: token_metas,
      })
    ),
    DeployUtil.standardPayment(
      constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
    )
  );
  //Step 5.2 Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  // Step 5: Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log("deployHash", deployHash);
};

main();

// casper-client get-deploy -n https://rpc.testnet.casperlabs.io/rpc e271fc14aaac23b91164d6f7a7a5039d48ca57cff46fee10106df8fc888b9428
