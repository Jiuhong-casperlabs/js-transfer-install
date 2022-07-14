import {
  CasperClient,
  Contracts,
} from "casper-js-sdk";

const main = async () => {

  const client = new CasperClient("http://localhost:11101/rpc");
  // const client = new CasperClient("http://16.162.124.124:7777/rpc");

  const { Contract } = Contracts;
  
  const contractClient = new Contract(client);
  const contract_hash = "hash-48131468bea504ba4c055ecd81f1c810f96a52a9d6a524f4e0ee7596552cca05" // contract hash
  contractClient.setContractHash(contract_hash)
  const addresses = await contractClient.queryContractData(["all_pairs"])     //named key


    const mappedAddresses = addresses.map((address) =>
      Buffer.from(addresses[0].data.value()).toString('hex')
    );

  console.log("mappedAddresses are ", mappedAddresses);

};

main();
