import {
  CasperServiceByJsonRPC,
  Keys,
  signRawMessage,
  verifyMessageSignature,
} from "casper-js-sdk";

const tempDir = "/home/jh/keys/test2";
const main = () => {
  let casperClient = new CasperServiceByJsonRPC(
    "http://88.99.167.167:7777/rpc"
  );

  const signKeyPair = casperClient.loadKeyPairFromPrivateFile(
    tempDir + "/secret_key.pem",
    Keys.SignatureAlgorithm.Ed25519
  );

  const message = Buffer.from(",ki87ujm");
  const signature = signKeyPair.sign(Buffer.from(message));
  console.log("signature string is\n", Buffer.from(signature).toString("hex"));
  console.log("signature is", signature);

  const result = signKeyPair.verify(signature, message);
  // console.log("result is ", result);

  // =========new

  const exampleMessage = "Hello World!";
  const wrongMessage = "!Hello World";

  const signature1 = signRawMessage(signKeyPair, exampleMessage);
  console.log("signature1", Buffer.from(signature1).toString("hex"));
  const valid = verifyMessageSignature(
    signKeyPair.publicKey,
    exampleMessage,
    signature1
  );
  console.log("valid is ", valid);
  const invalid = verifyMessageSignature(
    signKeyPair.publicKey,
    wrongMessage,
    signature1
  );
  console.log("invalid", invalid);
};

main();

//https://testnet.cspr.live/deploy/9d242efa3fab8b5191a2eabe8922da9d4fa9f9f94328efecb31fe6de09f57d15
