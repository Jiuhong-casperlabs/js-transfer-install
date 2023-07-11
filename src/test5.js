import {
  DeployUtil,
  RuntimeArgs,
  CLString,
  CasperServiceByJsonRPC,
  decodeBase16,
  CLU256,
  CLU128,
  CLByteArray,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC("http://localhost:11102/rpc"); //nctl
  // const client = new CasperServiceByJsonRPC("http://18.189.254.183:7777/rpc"); //integration-test

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    `/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1`
    // "/home/jh/keys/test1"
  );

  // contract hash
  const constracthash_str =
    // "hash-417c887a5dc2ac817fed932ff9cc0abb74c8c6cf04e771a2f5e98aa755680f49";
    "hash-2a141332ef03fe0d62aad2a565176e798439190c0b8c7e9a22b8ffbe3b9a2888";
  const contractHashAsByteArray = [
    ...Buffer.from(constracthash_str.slice(5), "hex"),
  ];

  //   token_contract: ByteArray":32
  // erc20 package
  // 5a76d550c34e60cad96ecba94437a0846f3961b8e2445d7f1012eb6bed8179f9
  const token_contract_str =
    // "813ebae62a86a7c92b6d16e0a341b3927bf08231322ba00936258f1c8adaa78d"; // integration-test
    "813ebae62a86a7c92b6d16e0a341b3927bf08231322ba00936258f1c8adaa78d"; // nctl
  const token_contract = new CLByteArray(
    Uint8Array.from(Buffer.from(token_contract_str, "hex"))
  );
  // const token_contract = new CLByteArray(decodeBase16(token_contract_str));
  // amount: u256
  // 10
  const amount = new CLU256(10);
  // gas_commission: u256
  // 5
  const gas_commission = new CLU256(5);
  // deadline:u256
  // 1688807878692
  const deadline = new CLU256(1688807878692);

  // nonce:u128
  // 1
  const nonce = new CLU128(1);
  // transaction_id:u256
  // 1
  const transaction_id = new CLU256(1);

  // destination_chain:string
  // GOERLI
  const destination_chain = new CLString("GOERLI");

  // destination_address:string
  // 9032d7eb50b5b4a48c21035f34e0A84e54921D75
  const destination_address = new CLString(
    "9032d7eb50b5b4a48c21035f34e0A84e54921D75"
  );

  // signature: "ByteArray":64
  // 73f7882d21ddbb78d397b2fc681630db95bdde6a4821e986654c71ec40cec7225bc5b0bc34498f071c438bd932b9724273aa411ef5cdd5433efcff21e4d71096

  const hash =
    "73f7882d21ddbb78d397b2fc681630db95bdde6a4821e986654c71ec40cec7225bc5b0bc34498f071c438bd932b9724273aa411ef5cdd5433efcff21e4d71096";
  // const signature = new CLByteArray(Uint8Array.from(Buffer.from(hash, "hex")));
  const signature = new CLByteArray(decodeBase16(hash));

  const runtimeArgs = RuntimeArgs.fromMap({
    token_contract,
    amount,
    gas_commission,
    deadline,
    nonce,
    transaction_id,
    destination_chain,
    destination_address,
    signature,
  });
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-net-1",
      // "integration-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "bridge_in",
      runtimeArgs
    ),
    DeployUtil.standardPayment(7000000000)
  );

  //Step 5.2 Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log(`deploy hash = ${JSON.stringify(deployHash)}`);
};

main();
