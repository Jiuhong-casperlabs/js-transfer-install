import { CasperClient, Contracts, CLU256 } from "casper-js-sdk";

const main = async () => {
  const client = new CasperClient("http://localhost:11101/rpc");
  // const client = new CasperClient("http://16.162.124.124:7777/rpc");

  const { Contract } = Contracts;

  const contractClient = new Contract(client);
  const contract_hash =
    "hash-3a2c0d6683291c5a39e4163f75a1684352551590b8cfb18c488b0d127b76d059"; // contract hash - testnet
  // const contract_hash = "hash-2d29c667c66d35fc4a40c73eb5d86af2ca6741d99bfb67ae2854321faffde3c7" //contract hash - nctl
  contractClient.setContractHash(contract_hash);

  console.log("queryContractDictionary");
  const result = await contractClient.queryContractDictionary(
    "my_dicname",
    "mydicitemkey"
  );

  console.log(`account-hash-${Buffer.from(result.data).toString("hex")}`);

  const result2 = await contractClient.queryContractDictionary(
    "my_dicname",
    "U256Key"
  );

  console.log("result2 is ", result2.data);
};

main();
