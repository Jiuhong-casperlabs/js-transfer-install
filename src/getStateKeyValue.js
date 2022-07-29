import { CasperClient, Contracts } from "casper-js-sdk";
import * as utils from "../utils";

const main = async () => {
  // const client = new CasperClient("http://localhost:11101/rpc");
  const client = new CasperClient("http://16.162.124.124:7777/rpc");

  const stateRootHash = await utils.getStateRootHash(client);

  const statekey =
    "hash-d33b980e28c94625c8d372ff16141ee283b5b7eb2b79f188d548ea7481c4acc5";
  const statePath = "myaccount";

  // const PATH_TO_CONTRACTS = "/home/jh/rust/test72/contract/target/wasm32-unknown-unknown/release/contract.wasm";
  const result = await client.nodeClient.getBlockState(
    stateRootHash,
    statekey,
    [statePath]
  );
  console.log("accountHash is ", result.Account.accountHash());

  const statekey1 =
    "account-hash-9a770006ffda6f5b40f9f2752e8e82ee4c7f0dc11d1e83ecda5b1d25598195a9"; //account hash
  const statePath1 = "mycontracthash";

  // const PATH_TO_CONTRACTS = "/home/jh/rust/test72/contract/target/wasm32-unknown-unknown/release/contract.wasm";
  const result1 = await client.nodeClient.getBlockState(
    stateRootHash,
    statekey1,
    [statePath1]
  );
  console.log("Contract is ", result1.Contract);
};

main();
