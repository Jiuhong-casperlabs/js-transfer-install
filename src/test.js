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
  formatMessageWithHeaders, signRawMessage, verifyMessageSignature,Ed25519
} from "casper-js-sdk";

import * as utils from "../utils";
import { Some, None } from "ts-results";
import * as constants from "../constants";

import eccrypto from "eccrypto";

const main = () => {


  let casperClient= new CasperClient(
    'http://88.99.167.167:7777/rpc'
  );
  
  const keyPairOfContract = utils.getKeyPairOfContract(
    constants.PATH_TO_SOURCE_KEYS
  );

  const edKeyPair = casperClient.newKeyPair(Keys.SignatureAlgorithm.Secp256K1);

  const publicKey = keyPairOfContract.publicKey.data;
  const buffer = keyPairOfContract.publicKey.data.buffer;
  const a = Buffer.from(buffer)

  console.log("========casper===========")
  const privateKey_casper = keyPairOfContract.privateKey;
  console.log("privateKey_casper", privateKey_casper)
  console.log("buffer from privateKey_casper", Buffer.from(privateKey_casper).toString("hex"))
  var publicKeycasper = keyPairOfContract.publicKey.data;
  console.log("publicKey_casper:", publicKeycasper)

  console.log("========eccrypto===========")
   var privateKeyA = eccrypto.generatePrivate();
  console.log("privateKeyA is:", privateKeyA)
  console.log("buffer from privateKeyA", Buffer.from(privateKeyA).toString("hex"))
    var publicKeyA = eccrypto.getPublic(privateKeyA);
  console.log("publicKeyA is:",publicKeyA)
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
