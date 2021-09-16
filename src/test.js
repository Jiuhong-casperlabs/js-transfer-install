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
} from "casper-js-sdk";
import { Some, None } from "ts-results";

import * as utils from "../utils";
import * as constants from "../constants";

const AMOUNT_TO_TRANSFER = 2500000000;

const main = () => {
  const myType = new CLOptionType(new CLBoolType());
  const mySomeOpt = new CLOption(Some(new CLString("String")));
  const myKey = new CLString("ABC");
  const myVal = new CLI32(123);
  const myMap = new CLMap([[myKey, myVal]]);

  const myString = new CLString("hello");
  const myList = new CLList([myString]);
  const optionlist = new CLOption(Some(new CLList([new CLString("hello")])));

  const keyPairofTarget = utils.getKeyPairOfContract(
    constants.PATH_TO_TRAGET_KEYS
  );

  const byteArr = new CLByteArray(
    new Uint8Array(keyPairofTarget.accountHash())
  );
  const myAccountKey = new CLKey(
    new CLByteArray(new Uint8Array(keyPairofTarget.accountHash()))
  );

  const count = new CLU32(1);

  const recipient = new CLKey(new CLByteArray(keyPairofTarget.accountHash()));
  const recipient2 = new CLKey(
    new CLByteArray(new Uint8Array(keyPairofTarget.accountHash()))
  );

  // const map1 = CLValueBuilder.map(["aaa", "bbb"]);
  // const ttt = CLValueBuilder.option(Some(true));

  // const myNoneOpt = new CLOption(None, new CLBoolType());
  console.log("recipient2:", recipient2);
  console.log("hello");

  // let token_ids = CLValueBuilder.option("SJH", CLTypeBuilder.bool);
  // console.log(token_ids);
};

main();

//https://testnet.cspr.live/deploy/9d242efa3fab8b5191a2eabe8922da9d4fa9f9f94328efecb31fe6de09f57d15
