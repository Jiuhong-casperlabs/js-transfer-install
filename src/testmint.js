import {
  DeployUtil,
  RuntimeArgs,
  CasperServiceByJsonRPC,
  CLByteArray,
  CLPublicKey,
  CLKey,
  CLAccountHash,
  CLString,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    `/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1`
  );

  // cep78
  const constracthash_str =
    "hash-ab3c5137322ef1fc779116308516701f87277e8e1a43f5f1884fad8f81fd2ca2";
  const contractHashAsByteArray = [
    ...Buffer.from(constracthash_str.slice(5), "hex"),
  ];

  // --session-arg "nft_contract_hash:key='hash-5dac641aced1c866c454fc4061db7bcc8ebca625ad6309e99e6fbb15fbfc0ba9'" \
  const hexString2 =
    "5dac641aced1c866c454fc4061db7bcc8ebca625ad6309e99e6fbb15fbfc0ba9";

  const hex2 = Uint8Array.from(Buffer.from(hexString2, "hex"));

  const nft_contract_hash = new CLKey(new CLByteArray(hex2));
  // --session-arg "token_owner:key='account-hash-89f5da2eaee5b7c3cabc7cc360d58fd0450ae02508f077977663aa087e27e42f'" \
  const hexString1 =
    "01537ef4e63252da396bf5e8ce99dfc37f4525cf4d83d25d42ae0a33d80ba987e9";

  const myHash1 = new CLAccountHash(
    CLPublicKey.fromHex(hexString1).toAccountHash()
  );

  const token_owner = new CLKey(myHash1);

  // --session-arg "token_meta_data:string='{"token_uri":"ipfs://bafkreidysh24vqhe3ww3i2wkwzrkbu2jnee7bhk46r3p2qxknn6uvroib4"}'"

  const meta_data_json = {
    token_uri:
      "ipfs://bafkreiffoidjyrnw7brlzbmuhpdnpeev6ujk3iie45yi247uo5sdk4peae",
  };

  // {"token_uri":"ipfs://bafkreiffoidjyrnw7brlzbmuhpdnpeev6ujk3iie45yi247uo5sdk4peae"}
  console.log(JSON.stringify(meta_data_json));
  // const token_meta_data = new CLString(JSON.stringify(meta_data_json));
  const token_meta_data = new CLString(
    '{"token_uri":"ipfs://bafkreiffoidjyrnw7brlzbmuhpdnpeev6ujk3iie45yi247uo5sdk4peae"}'
  );
  const runtimeArgs = RuntimeArgs.fromMap({
    nft_contract_hash,
    token_owner,
    token_meta_data,
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
      "mint",
      runtimeArgs
    ),
    DeployUtil.standardPayment(300000000000)
  );

  //Step 5.2 Sign deploy.
  // deploy = DeployUtil.signDeploy(deploy, keyPairofContract);
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log(`deploy hash = ${JSON.stringify(deployHash)}`);
};

main();
