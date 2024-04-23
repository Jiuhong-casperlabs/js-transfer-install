import {  CasperServiceByJsonRPC } from "casper-js-sdk";

const main = async () => {
  // Step 1: Set casper node client.
  const client = new CasperServiceByJsonRPC("https://rpc.testnet.casperlabs.io/rpc");


  // Step 5: Dispatch deploy to node.
  const stateRootHash = await client.getStateRootHash();
  const contract_hash =
    "hash-a453d479fbac9295906c6948544f5af4df7b509e13708ccaf31d0cb4dd6d2d82";
  const dictionary_name = "user_info"
  const dictionary_item_key = "4be44829b947b576995ac2c6d734d24f13537bca5105827066b170791661683d"
  const result = await client.getDictionaryItemByName(stateRootHash,contract_hash,dictionary_name,dictionary_item_key);

  console.log(`result = ${result}`);
};

main();
