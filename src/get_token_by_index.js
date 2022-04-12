import { CLPublicKey,CLKey,CLU256, CLAccountHash,CLValueParsers, CLString } from "casper-js-sdk";
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
    const public_key = "0203b4fb8f135bbfee4a3e26071624f0883229c6138c16bbbcebbba5381885e599ce";
    
    const myHash = new CLAccountHash(CLPublicKey.fromHex(public_key).toAccountHash());

    const key = new CLKey(myHash);

    // index
    const index = new CLU256(0)
    const dictionary_item_key_for_tokenid = keyAndValueToHex(key, index)
    console.log("dictionary_item_key_for_tokenid is: ", dictionary_item_key_for_tokenid)
    
    const value = new CLString("ac74d3d56735f2ebe9bb7f8b08e12baf7dd456711397d0995f5f8c9eddfe71c4");
    const dictionary_item_key_for_index  = keyAndValueToHex(key, value)
    console.log("dictionary_item_key_for_index is: ",dictionary_item_key_for_index )

};

main();

// npm run deploylock
