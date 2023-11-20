/**
 * @fileOverview CSPR JS SDK demo: ERC20 - install contract.
 */

import { Keys } from "casper-js-sdk";
const str_from_user =
  "7c1dabe583544ea1a33db866528b88d5c2d2d0edc19376b8066bfaf016f5d732";
const main = async () => {
  const PrivateKey =
    "7c1dabe583544ea1a33db866528b88d5c2d2d0edc19376b8066bfaf016f5d732";

  const privateKey = Buffer.from(PrivateKey, "hex");
  const publicKey = Keys.Secp256K1.privateToPublicKey(privateKey);
  const kp = Keys.Secp256K1.parseKeyPair(publicKey, privateKey, "raw");
  console.log(kp.accountHex());
  const pvPEM = kp.exportPrivateKeyInPem();
  console.log(pvPEM);
  const pkPEM = kp.exportPublicKeyInPem();
  console.log(pkPEM);
};

main();
