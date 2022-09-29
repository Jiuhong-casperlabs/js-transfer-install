import {
  CLPublicKey,
  CLValueParsers,
  CLKey,
  CLAccountHash,
} from "casper-js-sdk";

// recipient as CLPublicKey
const createRecipientAddress = (recipient) => {
  return new CLKey(new CLAccountHash(recipient.toAccountHash()));
};

const main = async () => {
  const pk1String1 =
    "01bed05482905c4a7f47837aeffbde82df64abc1ab2b64519b638de81c8c7d4f58";
  const account = CLPublicKey.fromHex(pk1String1);

  const key = createRecipientAddress(account);
  const keyBytes = CLValueParsers.toBytes(key).unwrap();
  const itemKey = Buffer.from(keyBytes).toString("base64");
  console.log(itemKey);

  const mystring =
    "020e0000006361737065722d6578616d706c65130000006578616d706c652d656e7472792d706f696e7401000000080000007175616e7469747904000000e803000001050100000006000000616d6f756e7404000000e803000001";
  const a = new Uint8Array(Buffer.from(mystring, "hex"));
  const itemKey1 = Buffer.from(a).toString("base64");
  console.log(itemKey1);
};
main();
