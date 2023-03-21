import {
  CasperClient,
  Contracts,
  CLPublicKey,
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
    "hash-ba950993182bbc4a73fbcc0183c43534bdf7fa9a862db5a847cc7d726e274d9e";
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
  const hexString2 =
    "3bfdd9e022e160f8d6e05638ab4647a8c7983276f001ba08a33ab1828cfbefa4"; //bridge_package_has

  const hex2 = Uint8Array.from(Buffer.from(hexString2, "hex"));

  const bridge_package_hash = new CLKey(new CLByteArray(hex2));
  console.log("bridge_package_hash=>", bridge_package_hash);
  const keyBytes = CLValueParsers.toBytes(bridge_package_hash).unwrap();
  const itemKey = Buffer.from(keyBytes).toString("base64");

  console.log(itemKey);
  const balance = await contractClient.queryContractDictionary(
    "balances",
    itemKey
  );

  console.log(balance.data.toString());
};

main();

// b'\x00"\x93"4\'\xd5\x9e\xbb3\x1a\xc2"\x1c?\xcd\x1b6V\xa5\xcbr\xbe\x92Jl\xdc\x9dR\xcd\xb6\xdb\x0f'
// data: Uint8Array(32) [
//   34, 147,  34,  52,  39, 213, 158, 187,
//   51,  26, 194,  34,  28,  63, 205,  27,
//   54,  86, 165, 203, 114, 190, 146,  74,
//  108, 220, 157,  82, 205, 182, 219,  15
// ]
