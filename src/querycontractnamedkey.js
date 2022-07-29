import { CasperClient, Contracts } from "casper-js-sdk";

const main = async () => {
  const client = new CasperClient("http://localhost:11101/rpc");
  // const client = new CasperClient("http://16.162.124.124:7777/rpc");

  const { Contract } = Contracts;

  const contractClient = new Contract(client);
  const contract_hash =
    "hash-48131468bea504ba4c055ecd81f1c810f96a52a9d6a524f4e0ee7596552cca05"; // contract hash
  contractClient.setContractHash(contract_hash);
  const addresses = await contractClient.queryContractData(["all_pairs"]); //named key

  const mappedAddresses = addresses.map((address) =>
    Buffer.from(address.data.value()).toString("hex")
  );

  console.log("mappedAddresses are ", mappedAddresses);
};

main();

// blockchain
// "stored_value": {
//             "CLValue": {
//                 "cl_type": {
//                     "List": "Key"
//                 },
//                 "bytes": "02000000010402030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20011402030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20",
//                 "parsed": [
//                     {
//                         "Hash": "hash-0402030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"
//                     },
//                     {
//                         "Hash": "hash-1402030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"
//                     }
//                 ]
//             }
//         },

// js result
// mappedAddresses are  [
//   '0402030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20',
//   '1402030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
// ]
