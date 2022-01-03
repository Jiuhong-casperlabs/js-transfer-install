import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLValueBuilder,
  CLTypeBuilder,
  CLString,
  CLI32,
  CLMap,
  CLU32,
  CLAccountHash,
  Keys,
} from "casper-js-sdk";
import {
  CLValueParsers,
  CLBool,
  CLList,
  CLOption,
  CLBoolType,
  CLOptionType,
  CLByteArray,
  CLKey,
  CLPublicKey,
  CLU64,
  CLPublicKeyTag,
} from "casper-js-sdk";
import * as utils from "../utils";
import { Some, None } from "ts-results";
import * as constants from "../constants";

const AMOUNT_TO_TRANSFER = 2500000000;

const mintNFT = async (minter, asset_id, meta_data, commisions) => {
  console.log(casperUtils.createRecipientAddress(minter));
  let deployParams = new DeployUtil.DeployParams(
    adminKeyPair.publicKey,
    networkName,
    gasPrice,
    ttl
  );
  console.log(deployParams);
  let args = RuntimeArgs.fromMap({
    recipient: casperUtils.createRecipientAddress(minter),
    token_ids: new CLString(asset_id),
    token_metas: casperUtils.toCLMap(meta_data),
    token_commisions: casperUtils.toCLMap(commisions),
  });

  console.log(args);
  let session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
    casperUtils.contractHashToByteArray(NFTDeployHash),
    "mint",
    args
  );
  console.log(session);
  const payment = DeployUtil.standardPayment(200);
  console.log(payment);
  const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
  console.log(deploy);
  const signedDeploy = DeployUtil.signDeploy(deploy, adminKeyPair);
  return await casperClient.putDeploy(signedDeploy);
};

toCLMap: (map) => {
  const clMap = CLValueBuilder.map([
    CLTypeBuilder.string(),
    CLTypeBuilder.string(),
  ]);
  for (const [key, value] of Array.from(map.entries())) {
    clMap.set(CLValueBuilder.string(key), CLValueBuilder.string(value));
  }
  return clMap;
};
// Create Recipient Address
createRecipientAddress: (recipient) => {
  if (recipient instanceof CLPublicKey) {
    return new CLKey(new CLAccountHash(recipient.toAccountHash()));
  } else {
    return new CLKey(
      new CLAccountHash(CLPublicKey.fromHex(recipient).toAccountHash())
    );
  }
};

const main = () => {
  const a = new CLValueBuilder.u512(1);
  const c = new CLOption(Some(a));
  // const b = new CLOption(new CLString("hello"));
  const starting_price = new CLOption(Some(new CLValueBuilder.u512(1)));
  const start_time = new CLU64("2641199115000");

  //****************************start_time u64*********************/

  //****************************cancellation_time u64*********************/

  const cancellation_time = new CLU64("2641199315000");

  //****************************cancellation_time u64*********************/

  //****************************end_time u64*********************/

  const end_time = new CLU64("2641299315000");
  console.log(cancellation_time >= start_time);
  console.log(cancellation_time);
  console.log(start_time);
  console.log(start_time <= cancellation_time);
  console.log(cancellation_time <= end_time);
  // start <= cancel && cancel <= end;

  // let casperClient= new CasperClient(
  //   'http://88.99.167.167:7777/rpc'
  // );

  // console.log(casperUtils.createRecipientAddress(minter))

  //  let deployParams = new DeployUtil.DeployParams(adminKeyPair.publicKey, networkName, gasPrice, ttl);
  //   console.log(deployParams)
  //   let args = RuntimeArgs.fromMap({
  //       recipient: casperUtils.createRecipientAddress(minter),
  //       token_ids: new CLString(asset_id),
  //       token_metas: casperUtils.toCLMap(meta_data),
  //       token_commisions: casperUtils.toCLMap(commisions)
  //   });

  //   console.log(args)
  //   let session = DeployUtil.ExecutableDeployItem
  //   .newStoredContractByHash(casperUtils.contractHashToByteArray(NFTDeployHash), "mint", args );
  //   console.log(session)
  //   const payment = DeployUtil.standardPayment(200);
  //   console.log(payment)
  //   const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
  //   console.log(deploy)
  //   const signedDeploy = DeployUtil.signDeploy(deploy, adminKeyPair);
  //   return await casperClient.putDeploy(signedDeploy);
};

main();

//https://testnet.cspr.live/deploy/9d242efa3fab8b5191a2eabe8922da9d4fa9f9f94328efecb31fe6de09f57d15
