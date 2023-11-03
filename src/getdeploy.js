import * as constants from "../constants";
import { CasperServiceByJsonRPC } from "casper-js-sdk";

const DEPLOY_HASH =
  "a8b80dcc7ca8e975a84932ad3d8cae008da1aff580c4fe89294e0b5842ed77ae";

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const main = async () => {
  const client = new CasperServiceByJsonRPC(constants.DEPLOY_NODE_ADDRESS);

  let result = await client.getDeployInfo(DEPLOY_HASH);

  console.log(result["execution_results"]);
  while (result["execution_results"].length == 0) {
    sleep(1000);
    result = await client.getDeployInfo(DEPLOY_HASH);
  }
  if (result["execution_results"][0]["result"]["Success"]) {
    console.log(DEPLOY_HASH, "Success");
  } else {
    console.log(DEPLOY_HASH, "Failure");
  }
};

main();
