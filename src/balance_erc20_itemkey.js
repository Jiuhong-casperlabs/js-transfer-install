import {
  CasperServiceByJsonRPC,
  Contracts,
  encodeBase64,
  CLPublicKey,
  CLKey,
  CLByteArray,
  CLValueParsers,
  CLAccountHash,
} from "casper-js-sdk";

const main = async () => {
  const client = new CasperServiceByJsonRPC("http://94.130.10.55:7777/rpc");
  const { Contract } = Contracts;

  const contractClient = new Contract(client);
  // contract hash
  const contract_hash =
    "hash-9ed71ebcc07181f5392f2125803c7e9efd5232b4e715b52b664e6f70c9ac0085";
  contractClient.setContractHash(contract_hash);

  // public key whose balance to be checked
  const pk1String1 =
    "0118686f9a8ca3362ca24ab8d7e05edff7f780ac432f14c3e14a333c5571203c76";
  const account = CLPublicKey.fromHex(pk1String1);
  const key = new CLKey(new CLAccountHash(account.toAccountHash()));
  console.log("key=>", key);
  const keyBytes = CLValueParsers.toBytes(key).unwrap();
  const itemKey = Buffer.from(keyBytes).toString("base64");
  console.log(itemKey);
  // public key whose balance to be checked

  //recipient_package_hash
  const hexString2 =
    "2d7914257740a8101563776b0b1575b7776bebbc38a97a0d5a986552d76668e5";

  const hex2 = Uint8Array.from(Buffer.from(hexString2, "hex"));

  const recipient_package_hash = new CLKey(new CLByteArray(hex2));
  console.log("recipient_package_hash=>", recipient_package_hash);
  const keyBytes1 = CLValueParsers.toBytes(recipient_package_hash).unwrap();
  const itemKey1 = encodeBase64(keyBytes1);

  console.log(itemKey1);
};

main();
