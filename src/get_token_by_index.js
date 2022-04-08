
  
import { Keys,CLPublicKey,CLString,CLKey,CLU256, CLAccountHash,CLValueParsers } from "casper-js-sdk";
import * as constants from "../constants";
import fs from "fs";
import path from "path";
import blake from "blakejs";
import { concat } from "@ethersproject/bytes";
/**
 * Demonstration entry point.
 */

 const keyAndValueToHex = (key, value) => {
    const aBytes = CLValueParsers.toBytes(key).unwrap();
    const bBytes = CLValueParsers.toBytes(value).unwrap();
  
    const blaked = blake.blake2b(concat([aBytes, bBytes]), undefined, 32);
    const hex = Buffer.from(blaked).toString('hex');
  
    return hex;
 }
  
const main = async () => {

    // public key of receiver
    const public_key = "0152836c51eac04205bb7febe9d92da50758178b0bf388bd03e1da13147b99e2c5";
    
    const myHash = new CLAccountHash(CLPublicKey.fromHex(public_key).toAccountHash());

    const key = new CLKey(myHash);

    // index
    const index = new CLU256(0)

    const dictionary_item_key  = keyAndValueToHex(key, index)
    console.log("dictionary_item_key is: ",dictionary_item_key )

};

main();

// npm run deploylock
