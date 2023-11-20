import { Keys, CLPublicKey } from "casper-js-sdk";

const main = async () => {
  const keyWithLF =
    "-----BEGIN PUBLIC KEY-----\n" +
    "MDYwEAYHKoZIzj0CAQYFK4EEAAoDIgADxi+V3nQD4PkXa0CoIpWYyRP+kSFYt4ZX\n" +
    "nDacJ7MG1sk=\n" +
    "-----END PUBLIC KEY-----\n";

  const key2 = Keys.Secp256K1.parsePublicKey(
    Keys.Secp256K1.readBase64WithPEM(keyWithLF)
  );
  const a = CLPublicKey.fromSecp256K1(key2).toHex();
  console.log(a);
};

main();
