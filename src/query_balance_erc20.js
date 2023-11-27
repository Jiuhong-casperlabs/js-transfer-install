import {
  CasperClient,
  Contracts,
  encodeBase64,
  CLKey,
  CLByteArray,
  CLValueParsers,
} from "casper-js-sdk";

const main = async () => {
  const client = new CasperClient("http://94.130.10.55:7777/rpc");
  const { Contract } = Contracts;

  const contractClient = new Contract(client);
  // contract hash
  const contract_hash =
    "hash-4a31d64f1c5c09ce791083db791303f1f2cf83c208efc0a37ee1a3bf7422d9a7";
  contractClient.setContractHash(contract_hash);

  // // public key whose balance to be checked
  // const pk1String1 =
  //   "017fbbccf39a639a1a5f469e3fb210d9f355b532bd786f945409f0fc9a8c6313b1";
  // const account = CLPublicKey.fromHex(pk1String1);
  // const key = new CLKey(new CLAccountHash(account.toAccountHash()));
  // console.log("key=>", key);
  // const keyBytes = CLValueParsers.toBytes(key).unwrap();
  // const itemKey = Buffer.from(keyBytes).toString("base64");
  // public key whose balance to be checked

  //recipient_package_hash
  const hexString2 =
    "2d7914257740a8101563776b0b1575b7776bebbc38a97a0d5a986552d76668e5";

  const hex2 = Uint8Array.from(Buffer.from(hexString2, "hex"));

  const recipient_package_hash = new CLKey(new CLByteArray(hex2));
  console.log("recipient_package_hash=>", recipient_package_hash);
  const keyBytes = CLValueParsers.toBytes(recipient_package_hash).unwrap();
  const itemKey = encodeBase64(keyBytes);

  console.log(itemKey);
  const balance = await contractClient.queryContractDictionary(
    "balances",
    itemKey
  );

  console.log(balance.data.toString());
};

main();
