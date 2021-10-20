import * as constants from "../constants";
import { CasperClient, DeployUtil } from "casper-js-sdk";
import * as utils from "../utils";

const DEPLOY_HASH =
  "a8b80dcc7ca8e975a84932ad3d8cae008da1aff580c4fe89294e0b5842ed77ae";



const main = async () => {
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  const stateRootHash = await utils.getStateRootHash(client);

  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_KV_KEYS
  );

  const hash = Buffer.from(keyPairofContract.publicKey.toAccountHash()).toString('hex');
  const balanceUref = await client.nodeClient.getAccountBalanceUrefByPublicKeyHash(
            stateRootHash,
            hash,
        );
  const balance = await client.nodeClient.getAccountBalance(
            stateRootHash,
            balanceUref,
        );
  console.log("balance: ",balance.toString());
};

main();
