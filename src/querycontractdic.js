import {
  CasperClient,
  Contracts,
  CLAccountHash,
  CLKey,
  CLValue
} from "casper-js-sdk";

const main = async () => {

  // const client = new CasperClient("http://localhost:11101/rpc");
  const client = new CasperClient("http://16.162.124.124:7777/rpc");

  const { Contract } = Contracts;
  
  const contractClient = new Contract(client);
  const contract_hash = "hash-fe7b2d00804de7800da0115945df5fb662898455fe163934edc238c0473680da" // contract hash - testnet
  // const contract_hash = "hash-2d29c667c66d35fc4a40c73eb5d86af2ca6741d99bfb67ae2854321faffde3c7" //contract hash - nctl
  contractClient.setContractHash(contract_hash)
  

  console.log("queryContractDictionary")
  const result = await contractClient.queryContractDictionary("my_dicname", "mydicitemkey")

  console.log(`account-hash-${ Buffer.from(result.data).toString("hex")}`)
  

};

main();
