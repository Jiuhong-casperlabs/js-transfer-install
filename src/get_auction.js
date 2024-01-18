import { CasperClient } from "casper-js-sdk";
import * as constants from "../constants";

const main = async () => {
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  const validators = await client.nodeClient.getValidatorsInfo();

  console.log(`validators info = ${JSON.stringify(validators)}`);
};

main();
