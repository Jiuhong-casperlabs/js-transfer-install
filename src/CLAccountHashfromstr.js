import {
  CLPublicKey,
  CLKey,
  CLU256,
  CLAccountHash,
  CLValueParsers,
  CLString,
  CLValueBuilder,
  CLByteArray,
} from "casper-js-sdk";
import blake from "blakejs";
import { concat } from "@ethersproject/bytes";
/**
 * Demonstration entry point.
 */

const keyAndValueToHex = (key, value) => {
  const aBytes = CLValueParsers.toBytes(key).unwrap();
  const bBytes = CLValueParsers.toBytes(value).unwrap();

  const blaked = blake.blake2b(concat([aBytes, bBytes]), undefined, 32);
  const hex = Buffer.from(blaked).toString("hex");

  return hex;
};

const getTokenByIndex = (owner, index) => {
  const hex = keyAndValueToHex(
    CLValueBuilder.key(owner),
    CLValueBuilder.u256(index)
  );
  console.log("hex is: ", hex);
};

const main = async () => {
  //  CLAccountHash | CLPublicKey
  const hexString1 =
    "0203b4fb8f135bbfee4a3e26071624f0883229c6138c16bbbcebbba5381885e599ce";

  console.log("pk is:", CLPublicKey.fromHex(hexString1));

  const myHash1 = new CLAccountHash(
    CLPublicKey.fromHex(hexString1).toAccountHash()
  );

  console.log("myhash1:", myHash1.toString());
  // const myhash2 = CLPublicKey.fromHex(hexString1)

  // getTokenByIndex(myHash1, 0)
  // getTokenByIndex(myhash2,0)

  // // CLAccountHash from string
  // const json = {
  //     bytes:
  //       '4d9ba81c3928306d30c2200b0374c6f09ac2723ac599c46409a0f750c1c85334',  // accounthash
  //     cl_type: { ByteArray: 32 }
  // };
  // const data = CLValueParsers.fromJSON(json).unwrap().data

  // let myhash3 = new CLAccountHash(data);

  // getTokenByIndex(myhash3, 0)
};

main();
