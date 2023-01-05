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

  const token_ids = new CLList([new CLU256(11)]);

  
  const token_meta1 = new CLMap([[new CLString("name"), new CLString("myNFT")],[new CLString("description"), new CLString("some text of myNFT")],[new CLString("image"), new CLString("some url")]]);
  const token_metas = new CLList([token_meta1]);


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

main();

// casper-client get-deploy -n https://rpc.testnet.casperlabs.io/rpc e271fc14aaac23b91164d6f7a7a5039d48ca57cff46fee10106df8fc888b9428