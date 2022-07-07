import {
  CasperClient,
  Contracts,
} from "casper-js-sdk";
import * as utils from "../utils";

const main = async () => {

  const client = new CasperClient("http://localhost:11101/rpc");
  // const client = new CasperClient("http://16.162.124.124:7777/rpc");

  const stateRootHash = await utils.getStateRootHash(client);

  const statekey = "hash-3ed9e9188eec90d313a270b81a5ee414f6ecaa9ab9dc8581362f52b73a8655a0"
  const statePath = "myaccount"

  
  const result = await client.nodeClient.getBlockState(stateRootHash, statekey, [
    statePath,
  ]);
  console.log("result is ", result.Account)

};

main();

//https://testnet.cspr.live/deploy/516e5d8bbfc28ecf40e117fba2b0c153a44db2c778e04ce75bd044e2180f5394
