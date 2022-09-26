import {
  CLPublicKey,
  CLValueParsers,
  CLKey,
  CLAccountHash,
} from "casper-js-sdk";
import blake from 'blakejs';
// recipient as CLPublicKey
const createRecipientAddress = (recipient) => {
  return new CLKey(new CLAccountHash(recipient.toAccountHash()));
};

const main = async () => {
  const pk1String1 =
    "01fa135d45246f3c82791adc964c8c58f926404df6633eca186a14f337b52e3c76";
  const account = CLPublicKey.fromHex(pk1String1);

  const key = createRecipientAddress(account);
  const keyBytes = CLValueParsers.toBytes(key).unwrap();
  const itemKey = Buffer.from(keyBytes).toString("base64");
  console.log(itemKey);
};
main();
