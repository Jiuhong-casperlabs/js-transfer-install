import { CasperClient, Contracts } from "casper-js-sdk";
import * as utils from "../utils";

const main = async () => {
  // const client = new CasperClient("http://localhost:11101/rpc");
  const client = new CasperClient("http://94.130.10.55:7777/rpc");

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
  console.log("result is ", result);
  console.log("accountHash is ", result.Account.accountHash());

  const statekey1 =
    "uref-71f2b0883f2bcc40cb785cfdfdb26522789bcca102d45f22009dca7502fe6d6c-007"; //account hash

  // const PATH_TO_CONTRACTS = "/home/jh/rust/test72/contract/target/wasm32-unknown-unknown/release/contract.wasm";
  const result1 = await client.nodeClient.getBlockState(
    stateRootHash,
    statekey1
  );
  console.log("result is ", result1.CLValue.data.toString());
};

main();
