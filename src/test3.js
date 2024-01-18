import {
  DeployUtil,
  RuntimeArgs,
  CLString,
  CasperServiceByJsonRPC,
  CLAccountHash,
  CLPublicKey,
  CLKey,
  CLU256,
  CLByteArray,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  // const client = new CasperServiceByJsonRPC("https://rpc.testnet.casperlabs.io/rpc");
  // const client = new CasperServiceByJsonRPC("http://85.114.132.133:7777/rpc");
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    `/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1`
  );
  // --session-entry-point validate_transfer_nft \
  // --session-arg "metadata:string='https://google.com'"  \
  // cep78 contract hash
  const mint_with_str =
    "8d7982da39d58926356addbbf8bc98ef09d551cad4510c87b4d633b5da09c9fb";
  const mint_with = new CLByteArray(
    Uint8Array.from(Buffer.from(mint_with_str, "hex"))
  );
  // --session-arg "receiver:key='account-hash-46ed2680435035c29dfc4f33f01b53bf0ec3ed086b13a857a6ce469f587a4ec8'"  \
  const hexString =
    "013cafb1912c0ca0dc6e0251905f29ebe01176371c298e513a24c0f2d9b2bbff28";

  const accounthash = new CLAccountHash(
    CLPublicKey.fromHex(hexString).toAccountHash()
  );

  const receiver = new CLKey(accounthash);
  // --session-arg "action_id:U256='3604897'"  \
  const action_id = new CLU256(3604897);
  // --session-arg "sig_data:account_hash='account-hash-b6a099040c4b906a1ed5b63fa1b94084995f6035b8c074abb7631c4cd871b0a69dab018689a261293e8c25721ef0539f19c8b60d99493ba28c114140bd69be07'"  \

  const hash1 =
    "b6a099040c4b906a1ed5b63fa1b94084995f6035b8c074abb7631c4cd871b0a69dab018689a261293e8c25721ef0539f19c8b60d99493ba28c114140bd69be07";
  const sig_data = new CLByteArray(Uint8Array.from(Buffer.from(hash1, "hex")));

  const constracthash_str =
    "hash-8972825c75f922dedc9bb58bf85e0406bb460afc286206d774a2ae3960860021";
  const contractHashAsByteArray = [
    ...Buffer.from(constracthash_str.slice(5), "hex"),
  ];

  const runtimeArgs = RuntimeArgs.fromMap({
    metadata: new CLString(
      // '{"name": "John Doe","token_uri": "https://www.barfoo.com","checksum": "940bffb3f2bba35f84313aa26da09ece3ad47045c6a1292c2bbd2df4ab1a55fb"}'
      "https://google.com"
    ),
    mint_with,
    receiver,
    action_id,
    sig_data,
  });
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-net-1",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "validate_transfer_nft",
      runtimeArgs
    ),
    DeployUtil.standardPayment(300000000000)
  );

  //Step 5.2 Sign deploy.
  // deploy = DeployUtil.signDeploy(deploy, keyPairofContract);
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);
  const json = DeployUtil.deployToJson(deploy);
  console.log("json,", json);
  deploy = DeployUtil.deployFromJson(json).unwrap();
  console.log("deploy", deploy);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log(`deploy hash = ${JSON.stringify(deployHash)}`);
};

main();
