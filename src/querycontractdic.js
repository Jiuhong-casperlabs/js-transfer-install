import { CasperClient, Contracts } from "casper-js-sdk";

const PACKAGE_HASH =
  "547759de44cb9b212f88eda8fbe9430de9c7dfe405f3f8eeb91d71c3f6d18eed";
const ACCOUNT_HASH =
  "06a1376eb616edf017c271fa470c099a013aa671bbc2779acb2fb3e5a8fafe85";
const CONTRACT_HASH =
  "hash-9827ba39b049d2d2f29f8793200287345cdeb105ffdcf4e7bc5fdeafc25b5ffa";

// query cep47 balance
const main = async () => {
  // const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");
  const client = new CasperClient("https://rpc.testnet.casperlabs.io/rpc");

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
