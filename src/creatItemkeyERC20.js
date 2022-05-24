
import {CLPublicKey, CLValueParsers,CLKey,CLAccountHash } from "casper-js-sdk";

// recipient as CLPublicKey
const createRecipientAddress = (recipient) => { 
  return new CLKey(new CLAccountHash((recipient).toAccountHash()));
}

const main = async () => {
  const pk1String1 =
  "01bed05482905c4a7f47837aeffbde82df64abc1ab2b64519b638de81c8c7d4f58";
  const account = CLPublicKey.fromHex(pk1String1);
  
  const key = createRecipientAddress(account);
    const keyBytes = CLValueParsers.toBytes(key).unwrap();
  const itemKey = Buffer.from(keyBytes).toString("base64");
  console.log(itemKey)
};
main();
