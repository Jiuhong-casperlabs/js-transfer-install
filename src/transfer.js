/**
 * @fileOverview CSPR JS SDK demo: Native transfers.
 */

import _ from "lodash";
import {
  CasperServiceByJsonRPC,
  DeployUtil,
  CLPublicKey,
  Keys,
} from "casper-js-sdk";
import * as constants from "../constants";

// Amount with which to fund each account.
const AMOUNT_TO_TRANSFER = 2500000000;

const main = async () => {
  //Step1: set casper node client
  // const client = new CasperServiceByJsonRPC("http://3.144.137.38:7777/rpc"); // integration-test
  // const client = new CasperServiceByJsonRPC("http://94.130.10.55:7777/rpc"); // integration-test
  const client = new CasperServiceByJsonRPC(
    "https://rpc.testnet.casperlabs.io/rpc"
  ); // https://rpc.integration.casperlabs.io/rpc

  //step 2: Set source key pair
  //        Set target key pair
  // const source = utils.getKeyPairOfContract("/home/jh/keys/test1");

  // const tempDir = "/home/jh/keys/test12";
  // const publicKeyFromFIle = casperClient.loadPublicKeyFromFile(
  //   tempDir + "/public_key.pem",
  //   "secp256k1"
  // );
  // const privateKeyFromFile = casperClient.loadPrivateKeyFromFile(
  //   tempDir + "/secret_key.pem",
  //   "secp256k1"
  // );

  // const keyPairFromFile = Keys.Secp256K1.parseKeyPair(
  //   publicKeyFromFIle,
  //   privateKeyFromFile,
  //   "raw"
  // );

  const myprivatekey =
    "-----BEGIN EC PRIVATE KEY-----\n" +
    "MHQCAQEEIPVLbvZ0IZK+bO6vtCouOdYAp4yNmVGtTjKTJrPomNUvoAcGBSuBBAAK\n" +
    "oUQDQgAEWXfqhJMdyfoJwOzYmchxYWJRLQsjhEd6AVgDqzdahhUQ+c/DHbgodV9G\n" +
    "/ZRMqPwa6nSqt8ma/WlU3sTthfC1mA==\n" +
    "-----END EC PRIVATE KEY-----\n";

  const data1 = Keys.Secp256K1.readBase64WithPEM(myprivatekey);

  const privatekey = Keys.Secp256K1.parsePrivateKey(data1);
  const publicKey = Keys.Secp256K1.privateToPublicKey(privatekey);
  const keypair = Keys.Secp256K1.parseKeyPair(publicKey, privatekey, "raw");

  const hexString1 =
    "02032f2eac2b4b5d5a4129612be91aca6a0adaf8e5785719519d8c7bcf6d0617a997";
  const target_pk = CLPublicKey.fromHex(hexString1);

  //step 3: Invoke contract transfer endpoint
  //step 3.1 set deploy
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      // source.publicKey,
      keypair.publicKey,
      // "integration-test",
      "casper-test",
      constants.DEPLOY_GAS_PAYMENT,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newTransfer(
      AMOUNT_TO_TRANSFER,
      target_pk,
      null,
      _.random()
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER)
  );

  //step 3.2 Sign Deploy
  // deploy = DeployUtil.signDeploy(deploy, source);
  deploy = DeployUtil.signDeploy(deploy, keypair);
  //ste 3.4 Dispatch deploy to node
  let deployHash = await client.deploy(deploy);

  console.log(`deploy hash = ${JSON.stringify(deployHash)}`);
};

main();

// 3.138.177.248 ok
// 18.189.254.183 ok
