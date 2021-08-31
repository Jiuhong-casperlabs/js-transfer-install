import * as constants from "../constants";
import { CasperClient, DeployUtil } from "casper-js-sdk";

const DEPLOY_HASH =
  "a8b80dcc7ca8e975a84932ad3d8cae008da1aff580c4fe89294e0b5842ed77ae";

const main = async () => {
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  let result = await client.getDeploy(DEPLOY_HASH);
  console.log(JSON.stringify(result));
};

main();
