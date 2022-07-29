const fs = require("fs");
const path = require("path");
const axios = require("axios");
const casperClientSDK = require("casper-js-sdk");

const {
  Keys,
  CasperClient,
  CLPublicKey,
  DeployUtil,
} = require("casper-js-sdk");

const RPC_API = "http://3.208.91.63:7777/rpc";
const STATUS_API = "http://3.208.91.63:8888";

const sendTransfer = async ({ from, to, amount }) => {
  const casperClient = new CasperClient(RPC_API);

  const folder = path.join("./", "casper_keys");
  // read keys from structure created in #Generating keys
  const signKeyPair = Keys.Ed25519.parseKeyFiles(
    folder + "/" + from + "_public.pem",
    folder + "/" + from + "_private.pem"
  );

  // networkName can be taken from the status api
  const response = await axios.get(STATUS_API + "/status");

  let networkName = null;

  if (response.status == 200) {
    networkName = response.data.chainspec_name;
  }

  // for native-transfers payment price is fixed
  const paymentAmount = 10000000000;
  // transfer_id field in the request to tag the transaction and to correlate it to your back-end storage
  const id = 187821;
  // gas price for native transfers can be set to 1
  const gasPrice = 1;
  // time that the Deploy will remain valid for, in milliseconds, the default value is 1800000, which is 30 minutes
  const ttl = 1800000;

  let deployParams = new DeployUtil.DeployParams(
    signKeyPair.publicKey,
    networkName,
    ttl
  );

  // we create public key from account-address (in fact it is hex representation of public-key with added prefix)
  const toPublicKey = CLPublicKey.fromHex(to);

  const session = DeployUtil.ExecutableDeployItem.newTransfer(
    amount,
    toPublicKey,
    null,
    id
  );

  const payment = DeployUtil.standardPayment(paymentAmount);
  const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
  const signedDeploy = DeployUtil.signDeploy(deploy, signKeyPair);

  // we are sending the signed deploy
  return await casperClient.putDeploy(signedDeploy);
};

sendTransfer({
  // Put here the account-address of account that is a sender. Note that it needs to have balance > 2.5CSPR
  from: "<account-address>",
  // Put here the account-address of the receiver account. In fact this account dont need to exist, if key is proper, it will be created when deploy will be send.
  to: "<account-address>",
  // Minimal amount is 2.5CSPR so 2.5 * 10000 (1CSPR = 10.000 motes)
  amount: 25000000000,
});
