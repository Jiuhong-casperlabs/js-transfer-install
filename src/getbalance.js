import * as constants from "../constants";
import { CasperClient,CLPublicKey,CLPublicKeyTag } from "casper-js-sdk";


const main = async () => {
  const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

  // method 1
  // const rawEd25519Account = Uint8Array.from([
  //   154, 211, 137, 116, 146, 249, 164, 57,
  //   9, 35, 64, 255, 83, 105, 131, 86,
  //   169, 250, 100, 248, 12, 68, 201, 17,
  //   43, 62, 151, 55, 158, 87, 186, 148
  // ]);
    
  // const publicKeyEd25519 = new CLPublicKey(
  //   rawEd25519Account,
  //   CLPublicKeyTag.ED25519
  // );
  
  // const aa = await client.balanceOfByPublicKey(publicKeyEd25519);
  // console.log(aa.toNumber());

  // method 2
  const publicKey = CLPublicKey.fromHex(
    '0152836c51eac04205bb7febe9d92da50758178b0bf388bd03e1da13147b99e2c5'
  );

  const aa = await client.balanceOfByPublicKey(publicKey);
  console.log(aa.toNumber());
  // const accountHex = publicKey.toHex();
  // console.log("publicKey is: ", publicKey)
  // console.log("accountHex is: ",accountHex)

}
main();
