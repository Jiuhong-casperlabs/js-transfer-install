import { CasperClient } from "casper-js-sdk";
import * as utils from "../utils";

const main = async () => {
  // const client = new CasperClient("http://localhost:11101/rpc");
  const client = new CasperClient("http://94.130.10.55:7777/rpc");

  const stateRootHash = await utils.getStateRootHash(client);

  // contract hash
  const statekey =
    "hash-154ff59b5f9feec42d3a418058d66badcb2121dc3ffb2e3cf92596bf5aafbc88";

  // const PATH_TO_CONTRACTS = "/home/jh/rust/test72/contract/target/wasm32-unknown-unknown/release/contract.wasm";
  const result = await client.nodeClient.getBlockState(stateRootHash, statekey);
  console.log("result is ", JSON.stringify(result));
};

main();
