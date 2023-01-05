import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLMap,
  CLString,
  CLList,
  CLKey,
  CLU256,
  CLPublicKey,
  CLAccountHash
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_CEP47_KEYS
  );

  //Step3: Query node for global state root hash
  const stateRootHash = await utils.getStateRootHash(client);

  //Step4: Query node for contract hash
  const contractHash = await utils.getAccountNamedKeyValue(
    client,
    stateRootHash,
    keyPairofContract,
    "my_contract_contract_hash"
  );
  const contractHashAsByteArray = [
    ...Buffer.from(contractHash.slice(5), "hex"),
  ];

  const token_ids = new CLList([new CLU256(1), new CLU256(2), new CLU256(3)]);

  const meta_data_json = {
    name: "John Doe",
    symbol: "abc",
    token_uri: "https://www.barfoo.com",
  };

  const multiple_meta_data = new CLString(JSON.stringify(meta_data_json));


  const token_meta1 = new CLMap([[new CLString("a"), new CLString("aa")]]);
  const token_meta2 = new CLMap([[new CLString("b"), new CLString("bb")]]);
  const token_meta3 = new CLMap([[new CLString("c"), multiple_meta_data]]);
  const token_metas = new CLList([token_meta1, token_meta2, token_meta3]);


  const hexString =
  "010e31a03ea026a8e375653573e0120c8cb96699e6c9721ae1ea98f896e6576ac3";
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
      contractHashAsByteArray,
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
  deploy = client.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.putDeploy(deploy);

  console.log(`mint_one -- deploy hash = ${deployHash}`);
};
2500000000
main();

//https://testnet.cspr.live/deploy/9d242efa3fab8b5191a2eabe8922da9d4fa9f9f94328efecb31fe6de09f57d15
