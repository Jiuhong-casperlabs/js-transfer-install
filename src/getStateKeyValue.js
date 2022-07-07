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

  // const PATH_TO_CONTRACTS = "/home/jh/rust/test72/contract/target/wasm32-unknown-unknown/release/contract.wasm";
  const result = await client.nodeClient.getBlockState(stateRootHash, statekey, [
    statePath,
  ]);
  console.log("result is ", result.Account)

  const statekey1 = "account-hash-9f2d00edfce09a6743061b4b557049eb735040cc57ad2d924ad85220cbef77aa" //account hash
  const statePath1 = "mycontracthash"

  // const PATH_TO_CONTRACTS = "/home/jh/rust/test72/contract/target/wasm32-unknown-unknown/release/contract.wasm";
  const result1 = await client.nodeClient.getBlockState(stateRootHash, statekey1, [
    statePath1,
  ]);
  console.log("result is ", result1.Contract)

};

main();
