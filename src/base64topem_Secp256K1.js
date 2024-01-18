import { decodeBase64, Keys } from "casper-js-sdk";
const main = async () => {
  // const keyPairOfContract = utils.getSecp256k1KeyPairOfContract(
  //   "/home/jh/keys/test12"
  // );
  // const privateKeyBase64 = encodeBase64(keyPairOfContract.privateKey);
  // console.log(privateKeyBase64);
  // privateKeyBase64 is the one user has
  // example: 9Utu9nQhkr5s7q+0Ki451gCnjI2ZUa1OMpMms+iY1S8=

  const privateKeyBase64 = process.argv[1];
  const rawPrivKeyBytes = decodeBase64(privateKeyBase64);
  const privKey = Keys.Secp256K1.parsePrivateKey(rawPrivKeyBytes, "raw");
  const pubKey = Keys.Secp256K1.privateToPublicKey(privKey);
  const keyPair = new Keys.Secp256K1(pubKey, privKey);
  console.log(keyPair);
  let pripem = keyPair.exportPrivateKeyInPem();
  console.log(pripem);
};
main();
