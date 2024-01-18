import { decodeBase64, Keys } from "casper-js-sdk";
const main = async () => {
  // const keyPairOfContract = utils.getKeyPairOfContract("/home/jh/keys/test1");
  // const privateKeyBase64 = encodeBase64(keyPairOfContract.privateKey);
  // console.log(privateKeyBase64);
  // privateKeyBase64 is the one user has
  // example: v5LgwY9o8e30eIDPMo82OaYPZAPgkLzN+5AHV1CR9thSg2xR6sBCBbt/6+nZLaUHWBeLC/OIvQPh2hMUe5nixQ==

  const privateKeyBase64 = process.argv[1];
  const rawPrivKeyBytes = decodeBase64(privateKeyBase64);
  const privKey = Keys.Ed25519.parsePrivateKey(rawPrivKeyBytes, "raw");
  const pubKey = Keys.Ed25519.privateToPublicKey(privKey);
  const keyPair = new Keys.Ed25519({ publicKey: pubKey, secretKey: privKey });
  console.log(keyPair);
  let privatePem = keyPair.exportPrivateKeyInPem();
  console.log(privatePem);
};
main();
