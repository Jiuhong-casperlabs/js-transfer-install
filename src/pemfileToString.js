import { encodeBase16, CasperClient } from "casper-js-sdk";

const main = async () => {
  const client = new CasperClient("http://18.189.254.183:7777/rpc");

  const tempDir = "/home/jh/keys/test12";
  const privateKeyFromFile = client.loadPrivateKeyFromFile(
    tempDir + "/secret_key.pem",
    "secp256k1"
  );

  console.log(encodeBase16(privateKeyFromFile));

  const tempDir1 = "/home/jh/keys/test1";
  const privateKeyFromFile1 = client.loadPrivateKeyFromFile(
    tempDir1 + "/secret_key.pem",
    "ed25519"
  );

  console.log(encodeBase16(privateKeyFromFile1));
};

main();
