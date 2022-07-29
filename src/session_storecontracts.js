import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLList,
  CLU8,
  CLString,
  CLByteArray,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 5: Invoke contract transfer endpoint.

  //Step 5.1 Set deploy

  const myList = new CLList([new CLU8(1), new CLU8(2), new CLU8(3)]);

  const PATH_TO_CONTRACTS =
    "/home/jh/mywork/contractsworkspace/target/wasm32-unknown-unknown/release/storelistofcontracts.wasm";

  const hash1 =
    "09d429a0e282d55a0d0daa56f5e117f928bf107e27373152757307ada3f999d7";
  const hex1 = new CLByteArray(Uint8Array.from(Buffer.from(hash1, "hex")));
  const hex2 = new CLByteArray(Uint8Array.from(Buffer.from(hash1, "hex")));

  const myList1 = new CLList([hex1, hex2]);

  const client = new CasperClient("http://localhost:11101/rpc");

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getKeyPairOfContract(
    "/home/jh/casper-node/utils/nctl/assets/net-1/faucet"
  );

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      "casper-net-1",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACTS),
      RuntimeArgs.fromMap({
        contracts: myList1,
      })
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_INSTALL)
  );

  //Step 5.2 Sign deploy.
  deploy = client.signDeploy(deploy, keyPairOfContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.putDeploy(deploy);

  console.log(`store_tuple2 ${myList} 
   deploy hash = ${deployHash}`);
};

main();

//https://testnet.cspr.live/deploy/516e5d8bbfc28ecf40e117fba2b0c153a44db2c778e04ce75bd044e2180f5394
