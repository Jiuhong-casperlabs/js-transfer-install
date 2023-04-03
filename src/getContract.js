import { CasperClient } from "casper-js-sdk";
import * as utils from "../utils";

const main = async () => {
  const client = new CasperClient("http://localhost:11101/rpc");
  // const client = new CasperClient("http://94.130.10.55:7777/rpc");

  const stateRootHash = await utils.getStateRootHash(client);

  // contract hash
  const statekey =
    "hash-4b2ee4a94a483cab1f7abd2e0097e3a8f0f1a05e6f3ac3c7cf3c05c92cb0b02e";

  // const PATH_TO_CONTRACTS = "/home/jh/rust/test72/contract/target/wasm32-unknown-unknown/release/contract.wasm";
  const result = await client.nodeClient.getBlockState(stateRootHash, statekey);
  console.log("result is ", JSON.stringify(result));
};

main();
