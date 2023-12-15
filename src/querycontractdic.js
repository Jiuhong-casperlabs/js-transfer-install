import { CasperClient, Contracts, CLU256 } from "casper-js-sdk";

const ACCOUNT_HASH =
  "8d288f9a28f942afe39a45fce375bc3c1026c8f97acdd4de14e6bfcc3f707322";
const CONTRACT_HASH =
  "hash-5980eae4c01d536a0db6de3ec3bec87d9d1b7887805e224e940e45227cc4d83c";
const main = async () => {
  const client = new CasperClient("http://localhost:11101/rpc");

  const { Contract } = Contracts;

  const contractClient = new Contract(client);
  const contract_hash = CONTRACT_HASH; // contract hash
  contractClient.setContractHash(contract_hash);

  const balance = await contractClient.queryContractDictionary(
    "balances",
    ACCOUNT_HASH
  );

  console.log("balance:", balance.data.toString());
};

main();
