const fs = require("fs");
const path = require("path");
const { Keys } = require("casper-js-sdk");

const createAccountKeys = () => {
  // generate new keys
  const edKeyPair = Keys.Ed25519.new();
  const { publicKey, privateKey } = edKeyPair;
  // get account-address from public key
  const accountAddress = publicKey.toHex();
  // Get account-hash (Uint8Array) from public key
  const accountHash = publicKey.toAccountHash();

  // store keys as PEM files
  const publicKeyInPem = edKeyPair.exportPublicKeyInPem();
  const privateKeyInPem = edKeyPair.exportPrivateKeyInPem();

  const folder = path.join("./", "casper_keys");

  if (!fs.existsSync(folder)) {
    const tempDir = fs.mkdirSync(folder);
  }

  fs.writeFileSync(folder + "/" + accountAddress + "_public.pem", publicKeyInPem);
  fs.writeFileSync(folder + "/" + accountAddress + "_private.pem", privateKeyInPem);

  return accountAddress;
};

const newAccountAddress = createAccountKeys();

// Then you can create account on testnet.cspr.live and upload your key stored in casper_keys/<account-address>_public.pem