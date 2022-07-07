import {
  CasperClient,
  Contracts,
} from "casper-js-sdk";

const main = async () => {

  const client = new CasperClient("http://localhost:11101/rpc");
  // const client = new CasperClient("http://16.162.124.124:7777/rpc");

  const { Contract } = Contracts;
  
  const contractClient = new Contract(client);
  const contract_hash = "hash-1bf0161b5e5676024cba265c164a5a5f8eb90a5eee9aea701fa009076ec51da4" // contract hash
  contractClient.setContractHash(contract_hash)
  const result = await contractClient.queryContractData(["name"])     //named key
  console.log("result is ",result.toString())

};

main();

//https://testnet.cspr.live/deploy/516e5d8bbfc28ecf40e117fba2b0c153a44db2c778e04ce75bd044e2180f5394