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
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc"); //nctl
  // const client = new CasperServiceByJsonRPC("http://18.189.254.183:7777/rpc"); //integration-test

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    `/home/jh/test/tricorn-smart-contracts/casper`
    // "/home/jh/keys/test1"
  );

  // contract hash
  const constracthash_str =
    "hash-b20163febf2ddc2cdefdb0163dad77c722c552e65c0a77938cd0dac473e49d96";
  const contractHashAsByteArray = [
    ...Buffer.from(constracthash_str.slice(5), "hex"),
  ];

  //   token_contract: ByteArray":32
  // erc20 package
  const token_contract_str =
    "92d343bebed415c0e8cca53d5b9a6d85cff7e3539669c250ff8a648554e4a20f"; // nctl
  const token_contract = new CLByteArray(decodeBase16(token_contract_str));
  // amount: u256
  // 10
  const amount = new CLU256(10);
  // gas_commission: u256
  // 5
  const gas_commission = new CLU256(5);
  // deadline:u256
  //                          1688807878692
  const deadline = new CLU256(1794009713000); //length is important!!!
  //                          1694057676800

  // nonce:u128
  // 1
  const nonce = new CLU128(1111234454);
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
    DeployUtil.standardPayment(700000000000)
  );

  //Step 5.2 Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);
  console.log("deploy: ", DeployUtil.deployToJson(deploy));

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log(`deploy hash = ${JSON.stringify(deployHash)}`);
};

main();
