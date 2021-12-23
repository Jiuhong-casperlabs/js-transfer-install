import * as constants from "../constants";
import { CasperClient,CLPublicKey,CLPublicKeyTag } from "casper-js-sdk";


const main = async () => {
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  const rawEd25519Account = Uint8Array.from([
    154, 211, 137, 116, 146, 249, 164, 57,
    9, 35, 64, 255, 83, 105, 131, 86,
    169, 250, 100, 248, 12, 68, 201, 17,
    43, 62, 151, 55, 158, 87, 186, 148
  ]);
    
  const publicKeyEd25519 = new CLPublicKey(
    rawEd25519Account,
    CLPublicKeyTag.ED25519
  );
  
  const aa = await client.balanceOfByPublicKey(publicKeyEd25519);
  console.log(aa.toNumber());
}
main();
