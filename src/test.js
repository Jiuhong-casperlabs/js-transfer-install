import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLValueBuilder,
  CLTypeBuilder,
  CLString,
  CLValue,
  CLI32,
  CLMap,
  CLU32,
  CLU512,
  CLAccountHash,
  Keys,
  CLKey,
  CLPublicKey,
  formatMessageWithHeaders,
  signRawMessage,
  verifyMessageSignature,
  Ed25519,
  ContractHash,
} from "casper-js-sdk";

import * as utils from "../utils";
import { Some, None } from "ts-results";
import * as constants from "../constants";

import { decodeBase16 } from "casper-js-sdk";

const main = () => {
  let casperClient = new CasperClient("http://88.99.167.167:7777/rpc");
  const hexString1 =
    "63b82f736afb9ae7177398ed8dd18cc662119d52ad0c509c3881d83b606d3b61";

  const hex1 = Uint8Array.from(Buffer.from(hexString1, "hex"));

  // const token_contract_hash = new CLKey(new CLByteArray(hex1));
  const key_accounthash = new CLKey(new CLAccountHash(hex1));

  // const pk2String2 =
  //   "01bed05482905c4a7f47837aeffbde82df64abc1ab2b64519b638de81c8c7d4f58";
  // const pk2 = CLPublicKey.fromHex(pk2String2);
  // console.log(pk2);

  // const pk2String1 =
  //   "0203da3025e1732280cc825a81bbaaaa2337991b37a84e53f4042c8d8236b6adb017";
  // const pk1 = CLPublicKey.fromHex(pk2String1);
  // console.log(pk1);
  // const edKeyPair = utils.getKeyPairOfContract(constants.PATH_TO_SOURCE_KEYS); // load existing pair of keys

  // const { publicKey, privateKey } = edKeyPair;
  // console.log(privateKey);
  // console.log(publicKey);
  // const keyPairOfContract = utils.getKeyPairOfContract(
  //   constants.PATH_TO_SOURCE_KEYS
  // );

  // const edKeyPair = casperClient.newKeyPair(Keys.SignatureAlgorithm.Secp256K1);

  // const publicKey = keyPairOfContract.publicKey.data;
  // const buffer = keyPairOfContract.publicKey.data.buffer;
  // const a = Buffer.from(buffer)

  // console.log("========casper===========")
  // const privateKey_casper = keyPairOfContract.privateKey;
  // console.log("privateKey_casper", privateKey_casper)
  // console.log("buffer from privateKey_casper", Buffer.from(privateKey_casper).toString("hex"))
  // var publicKeycasper = keyPairOfContract.publicKey.data;
  // console.log("publicKey_casper:", publicKeycasper)

  // console.log("========eccrypto===========")
  //  var privateKeyA = eccrypto.generatePrivate();
  // console.log("privateKeyA is:", privateKeyA)
  // console.log("buffer from privateKeyA", Buffer.from(privateKeyA).toString("hex"))
  //   var publicKeyA = eccrypto.getPublic(privateKeyA);
  // console.log("publicKeyA is:",publicKeyA)
  // console.log("publicKey data casper:", publicKey)
  // console.log("publicKey buffer casper:", buffer)
  // console.log("a is ",a)

  // eccrypto.encrypt(publicKeycasper, Buffer.from("msg to b")).then(function (encrypted) { // B decrypting the message.
  //   eccrypto.decrypt(privateKey, encrypted).then(function (plaintext) {
  //     // console.log("Message to part B:", plaintext.toString());
  //   });
  // });

  // newnewnew

  // var privateKeyA = eccrypto.generatePrivate();
  // console.log("privateKeyA is:",privateKeyA)
  // var publicKeyA = eccrypto.getPublic(privateKeyA);
  // console.log("publicKeyA is:",publicKeyA)
  // var privateKeyB = eccrypto.generatePrivate();
  // var publicKeyB = eccrypto.getPublic(privateKeyB);  // Encrypting the message for B.
  // eccrypto.encrypt(publicKeyB, Buffer.from("msg to b")).then(function (encrypted) { // B decrypting the message.
  //   eccrypto.decrypt(privateKeyB, encrypted).then(function (plaintext) {
  //     console.log("Message to part B:", plaintext.toString());
  //   });
  // }); // Encrypting the message for A.
  // eccrypto.encrypt(publicKeyA, Buffer.from("msg to a")).then(function (encrypted) { // A decrypting the message.
  //   eccrypto.decrypt(privateKeyA, encrypted).then(function (plaintext) {
  //     console.log("Message to part A:", plaintext.toString());
  //   });
  // });
};

main();

//https://testnet.cspr.live/deploy/9d242efa3fab8b5191a2eabe8922da9d4fa9f9f94328efecb31fe6de09f57d15
