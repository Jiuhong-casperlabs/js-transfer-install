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
  const paymentAmount = 1000000000;
  const amountToBPaid = 2500000000;
  accountAddress = accountAddress;
  console.log("Address : ", accountAddress);

  // transfer_id field in the request to tag the transaction and to correlate it to your back-end storage
  const id = 187821;

  // gasPrice for native transfers can be set to 1
  const gasPrice = 1;

  // Time that the deploy will remain valid for, in milliseconds
  // The default value is 1800000 ms (30 minutes)
  const ttl = 1800000;
  const chainName = 'casper-test';

  const senderPublicKey = CLPublicKey.fromHex(accountAddress);

  let deployParams = new DeployUtil.DeployParams(senderPublicKey, chainName, gasPrice, ttl);

  // We create a public key from account-address (it is the hex representation of the public-key with an added prefix)
  const toPublicKey = CLPublicKey.fromHex('0202d9c3548ad3741faabe08e5c48c88a61b19debf24771a9b1019569bff97a1bf01');

  const session = DeployUtil.ExecutableDeployItem.newTransfer(amountToBPaid, toPublicKey, null, id);

  const payment = DeployUtil.standardPayment(paymentAmount);
  const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
};

sendTransfer({
  // Put here the account-address of account that is a sender. Note that it needs to have balance > 2.5CSPR
  from: "<account-address>",
  // Put here the account-address of the receiver account. In fact this account dont need to exist, if key is proper, it will be created when deploy will be send.
  to: "<account-address>",
  // Minimal amount is 2.5CSPR so 2.5 * 10000 (1CSPR = 10.000 motes)
  amount: 25000000000,
});
