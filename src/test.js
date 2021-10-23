import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLValueBuilder,
  CLTypeBuilder,
  CLString,
  CLI32,
  CLMap,
  CLU32,
  Keys
} from "casper-js-sdk";
import {
  CLValueParsers,
  CLBool,
  CLList,
  CLOption,
  CLBoolType,
  CLOptionType,
  CLByteArray,
  CLKey,
  CLPublicKey
} from "casper-js-sdk";
import * as utils from "../utils";
import { Some, None } from "ts-results";
import * as constants from "../constants";

const AMOUNT_TO_TRANSFER = 2500000000;

const main = () => {

  let casperClient= new CasperClient(
    'http://192.168.2.166:40101/rpc'
  );

  const edKeyPair = casperClient.newKeyPair(Keys.SignatureAlgorithm.Secp256K1);
  const publicKey = edKeyPair.publicKey.value();
  const privateKey = edKeyPair.privateKey;
 
  const convertFromPrivateKey = casperClient.privateToPublicKey(
    privateKey,
    Keys.SignatureAlgorithm.Ed25519
  );
  const ttt =  Buffer.from(convertFromPrivateKey).toString("hex");
  const ttt2 = Buffer.from(privateKey).toString("hex");

  // console.log("public key string: ",ttt);
  // console.log("public key string length: ",ttt.length);

  // console.log("private key string:",ttt2)
  // console.log("private key length:",ttt2.length)



  const hexString = '010e31a03ea026a8e375653573e0120c8cb96699e6c9721ae1ea98f896e6576ac3';

  const hex = Uint8Array.from(Buffer.from(hexString, 'hex'));
  console.log("hex:",hex)

  const result = CLPublicKey.fromHex(hexString).toAccountHashStr()
  console.log("result:",result)
  // const myType = new CLOptionType(new CLBoolType());
  // const mySomeOpt = new CLOption(Some(new CLString("String")));
  // const myKey = new CLString("ABC");
  // const myVal = new CLI32(123);
  // const myMap = new CLMap([[myKey, myVal]]);

  // const myString = new CLString("hello");
  // const myList = new CLList([myString]);
  // const optionlist = new CLOption(Some(new CLList([new CLString("hello")])));

  // const keyPairofTarget = utils.getKeyPairOfContract(
  //   constants.PATH_TO_TRAGET_KEYS
  // );

  // const byteArr = new CLByteArray(
  //   new Uint8Array(keyPairofTarget.accountHash())
  // );
  // const myAccountKey = new CLKey(
  //   new CLByteArray(new Uint8Array(keyPairofTarget.accountHash()))
  // );

  // const count = new CLU32(1);

  // const recipient = new CLKey(new CLByteArray(keyPairofTarget.accountHash()));
  // const recipient2 = new CLKey(
  //   new CLByteArray(new Uint8Array(keyPairofTarget.accountHash()))
  // );

  // // const map1 = CLValueBuilder.map(["aaa", "bbb"]);
  // // const ttt = CLValueBuilder.option(Some(true));

  // // const myNoneOpt = new CLOption(None, new CLBoolType());
  // console.log("recipient2:", recipient2);
  // console.log("hello");

  // // let token_ids = CLValueBuilder.option("SJH", CLTypeBuilder.bool);
  // // console.log(token_ids);



};

main();

//https://testnet.cspr.live/deploy/9d242efa3fab8b5191a2eabe8922da9d4fa9f9f94328efecb31fe6de09f57d15
