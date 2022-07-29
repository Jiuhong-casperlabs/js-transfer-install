import * as constants from "../constants";
import { CasperClient, DeployUtil } from "casper-js-sdk";

const DEPLOY_HASH =
  "a8b80dcc7ca8e975a84932ad3d8cae008da1aff580c4fe89294e0b5842ed77ae";

const main = async () => {
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  const [deploy, deployRes] = await client.getDeploy(
    "595F274E5e83FD3df897c95dAc144af52215Fd566cBA1CD1576d95dd2DE1cbAC"
  );
  const toPubKey = deploy.session.getArgByName("target");
  console.log("toPubKey:", toPubKey);
  console.log("deployRes", deployRes);
  console.log(
    "toPubKey",
    JSON.stringify(Buffer.from(toPubKey.value()).toString("hex"), null, 4)
  );
};

main();
