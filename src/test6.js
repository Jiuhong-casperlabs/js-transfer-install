import {
  DeployUtil,
  RuntimeArgs,
  CLString,
  CasperServiceByJsonRPC,
  decodeBase16,
  CLU256,
  CLU128,
  CLByteArray,
  signFormattedMessage,
  encodeBase16,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const stringToHex = (str) => {
  let hex = "";
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    const hexValue = charCode.toString(16);

    // Pad with zeros to ensure two-digit representation
    hex += hexValue.padStart(2, "0");
  }
  return hex;
};

function concatTypedArrays(a, b) {
  // a, b TypedArray of same type
  var c = new a.constructor(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}

function concatBytes(ui8a, byte) {
  var b = new Uint8Array(1);
  b[0] = byte;
  return concatTypedArrays(ui8a, b);
}

const main = async () => {
  //Step 1: Set casper node client
  // const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc"); //nctl
  const client = new CasperServiceByJsonRPC("http://18.189.254.183:7777/rpc"); //integration-test

  // //Step 2: Set contract operator key pair
  // const keyPairofContract = utils.getKeyPairOfContract(
  //   `/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1`
  //   // "/home/jh/keys/test1"
  // );

  // // contract hash
  // const constracthash_str =
  //   // "hash-417c887a5dc2ac817fed932ff9cc0abb74c8c6cf04e771a2f5e98aa755680f49";
  //   "hash-ff81a352f9103b5aeba38b3aeffde71977bf47ebdf89f3f1efe293ea2042af0e";
  // const contractHashAsByteArray = [
  //   ...Buffer.from(constracthash_str.slice(5), "hex"),
  // ];

  // //   token_contract: ByteArray":32
  // // erc20 package
  // // 5a76d550c34e60cad96ecba94437a0846f3961b8e2445d7f1012eb6bed8179f9
  // const token_contract_str =
  //   // "813ebae62a86a7c92b6d16e0a341b3927bf08231322ba00936258f1c8adaa78d"; // integration-test
  //   "7a7607fc2a9576fa429155706a2e451f6b3b869475583a501eb23327446716bc"; // nctl
  // // const token_contract = new CLByteArray(
  // //   Uint8Array.from(Buffer.from(token_contract_str, "hex"))
  // // );
  // const token_contract = new CLByteArray(decodeBase16(token_contract_str));
  // // amount: u256
  // // 10
  // const amount = new CLU256(10);
  // // gas_commission: u256
  // // 5
  // const gas_commission = new CLU256(5);
  // // deadline:u256
  // //                          1688807878692
  // const deadline = new CLU256(1794009713000); //length is important!!!
  // //                          1694057676800

  // // nonce:u128
  // // 1
  // const nonce = new CLU128(1111234454);
  // // transaction_id:u256
  // // 1
  // const transaction_id = new CLU256(1);

  // // destination_chain:string
  // // GOERLI
  // const destination_chain = new CLString("GOERLI");

  // // destination_address:string
  // // 9032d7eb50b5b4a48c21035f34e0A84e54921D75
  // const destination_address = new CLString(
  //   "9032d7eb50b5b4a48c21035f34e0A84e54921D75"
  // );

  // // signature: "ByteArray":64
  // // 73f7882d21ddbb78d397b2fc681630db95bdde6a4821e986654c71ec40cec7225bc5b0bc34498f071c438bd932b9724273aa411ef5cdd5433efcff21e4d71096

  // // prefix = "TRICORN_BRIDGE_IN";
  // // let mut bytes = Vec::new();
  // // bytes.extend_from_slice(prefix.as_bytes());
  // // bytes.extend_from_slice(bridge_hash.as_bytes());
  // // bytes.extend_from_slice(token_package_hash.as_bytes());
  // // bytes.extend_from_slice(account_address.as_bytes());
  // // bytes.extend_from_slice(&amount);
  // // bytes.extend_from_slice(&gas_commission);
  // // bytes.extend_from_slice(&deadline);
  // // bytes.extend_from_slice(&nonce);
  // // bytes.extend_from_slice(&transaction_id);
  // // bytes.extend_from_slice(destination_chain);
  // // bytes.push(0x00);
  // // bytes.extend_from_slice(&destination_address);
  // // bytes
  // const prefix = stringToHex("TRICORN_BRIDGE_IN");
  // const bridge_hash =
  //   "ff81a352f9103b5aeba38b3aeffde71977bf47ebdf89f3f1efe293ea2042af0e";
  // const token_package_hash =
  //   "7a7607fc2a9576fa429155706a2e451f6b3b869475583a501eb23327446716bc";
  // const account_address =
  //   "268e180c3f0cf2232db8528f9730aa2d77036c3deaad45e5bf600063017ce225";
  // const amount_str = stringToHex("10");
  // // gas_commission: u256
  // // 5
  // const gas_commission_str = stringToHex("5");

  // const deadline_str = stringToHex("1794009713000");
  // const nonce_str = stringToHex("1111234454");
  // const transaction_id_str = stringToHex("1");
  // const destination_chain_str = stringToHex("GOERLI");
  // const destination_address_str = "9032d7eb50b5b4a48c21035f34e0A84e54921D75";

  // const data =
  //   prefix +
  //   bridge_hash +
  //   token_package_hash +
  //   account_address +
  //   amount_str +
  //   gas_commission_str +
  //   deadline_str +
  //   nonce_str +
  //   transaction_id_str +
  //   destination_chain_str;
  // //   stringToHex("0");
  // // destination_address_str;

  // // console.log(data);

  // let ua = decodeBase16(data);

  // ua = concatBytes(ua, 0x00);

  // const wholemessagearray = concatTypedArrays(
  //   ua,
  //   decodeBase16(destination_address_str)
  // );

  // const result = signFormattedMessage(keyPairofContract, wholemessagearray);

  // console.log(encodeBase16(result));

  const result = await client.getDeployInfo(
    "27a594b8db0a38f10629506dbdbab09746cc9d2bb435e519e9b9a04df15422c4"
  );

  console.log("result", JSON.stringify(result));

  // // const hash =
  // //   "73f7882d21ddbb78d397b2fc681630db95bdde6a4821e986654c71ec40cec7225bc5b0bc34498f071c438bd932b9724273aa411ef5cdd5433efcff21e4d71096";
  // // ("3a65df034fc5f2697ec6010b31d4229ae36b593d6e20982612466d467d0910b667b522be754d8b7111de4ec85db083b6f9f1bb8917d7d3268e06383e1061d604");
  // // ("95c5733f34ca5d41802ed6655dd93208ab467a9fd68a0ecd04cb4e92fc21b5d2362d3b25726567ca6d38007abbaad15157eb46d92265b38d36aeff19b59b0e0c");
  // // ("1babb50ad05f179985295654e2f1b31ef0b15637efbca7cc8b6601158e67811bc1aa0e4ee30271a6e68ec658495f2f2360b67bea733baec97e63b960efe9b00c");
  // // ("8257b350b79eb9929cc8c9bdd8eff74672db6ac28e301a6fb418e3e9abe0a96043c22acc1abfe23c95d1bb466b5f17e831eba1035e091677c074e8122df45e00");
  // // ("8257b350b79eb9929cc8c9bdd8eff74672db6ac28e301a6fb418e3e9abe0a96043c22acc1abfe23c95d1bb466b5f17e831eba1035e091677c074e8122df45e00");
  // // const signature = new CLByteArray(Uint8Array.from(Buffer.from(hash, "hex")));
  // const signature = new CLByteArray(result);

  // const runtimeArgs = RuntimeArgs.fromMap({
  //   token_contract,
  //   amount,
  //   gas_commission,
  //   deadline,
  //   nonce,
  //   transaction_id,
  //   destination_chain,
  //   destination_address,
  //   signature,
  // });
  // let deploy = DeployUtil.makeDeploy(
  //   new DeployUtil.DeployParams(
  //     keyPairofContract.publicKey,
  //     "casper-net-1",
  //     // "integration-test",
  //     constants.DEPLOY_GAS_PRICE,
  //     constants.DEPLOY_TTL_MS
  //   ),
  //   DeployUtil.ExecutableDeployItem.newStoredContractByHash(
  //     contractHashAsByteArray,
  //     "bridge_in",
  //     runtimeArgs
  //   ),
  //   DeployUtil.standardPayment(700000000000)
  // );

  // //Step 5.2 Sign deploy.
  // deploy = DeployUtil.signDeploy(deploy, keyPairofContract);
  // console.log("deploy: ", DeployUtil.deployToJson(deploy));

  // //Step 5.3 Dispatch deploy to node.
  // let deployHash = await client.deploy(deploy);
  // console.log(`deploy hash = ${JSON.stringify(deployHash)}`);
};

main();
