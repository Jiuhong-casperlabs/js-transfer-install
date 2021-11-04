import {
  CasperClient,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
  CLList,
  CLString,
  CLKey,
  CLByteArray,
  CLValue,
  Keys,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";
import fs from "fs";
import path from "path";

// Path to contract to be installed.
const PATH_TO_CONTRACT = constants.PATH_TO_LOCKED;

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

  return accountAddress;
};

main();

// npm run deploylock
