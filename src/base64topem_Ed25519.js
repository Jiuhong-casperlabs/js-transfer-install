import { decodeBase64, Keys, encodeBase64 } from "casper-js-sdk";
import * as utils from "../utils";
const main = async () => {
  const keyPairOfContract = utils.getKeyPairOfContract("/home/jh/keys/test1");
  const privateKeyBase64 = encodeBase64(keyPairOfContract.privateKey);
  console.log(privateKeyBase64);
  // privateKeyBase64 is the one user has

  const rawPrivKeyBytes = decodeBase64(privateKeyBase64);
  const privKey = Keys.Ed25519.parsePrivateKey(rawPrivKeyBytes, "raw");
  const pubKey = Keys.Ed25519.privateToPublicKey(privKey);
  const keyPair = new Keys.Ed25519({ publicKey: pubKey, secretKey: privKey });
  console.log(keyPair);
  let privatePem = keyPair.exportPrivateKeyInPem();
  console.log(privatePem);
};
main();
