import { Keys } from "casper-js-sdk";
import * as constants from "../constants";
import fs from "fs";
import path from "path";

/**
 * Demonstration entry point.
 */
const main = async () => {
  // Generating keys
  const edKeyPair = Keys.Ed25519.new();
  const { publicKey, privateKey } = edKeyPair;

  // Get account-address from public key
  const accountAddress = publicKey.toHex();

  // Get account-hash (Uint8Array) from public key
  const accountHash = publicKey.toAccountHash();

  // Store keys as PEM files
  const publicKeyInPem = edKeyPair.exportPublicKeyInPem();
  const privateKeyInPem = edKeyPair.exportPrivateKeyInPem();

  const folder = path.join("./", "casper_keys");

  if (!fs.existsSync(folder)) {
    const tempDir = fs.mkdirSync(folder);
  }

  fs.writeFileSync(
    folder + "/" + accountAddress + "_public.pem",
    publicKeyInPem
  );
  fs.writeFileSync(
    folder + "/" + accountAddress + "_private.pem",
    privateKeyInPem
  );
};

main();

// npm run deploylock
