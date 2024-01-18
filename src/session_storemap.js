import {
  DeployUtil,
  CasperServiceByJsonRPC,
  RuntimeArgs,
  CLValueBuilder,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    "/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1"
  );

  //Step4: Query node for contract hash
  const constracthash_str =
    "hash-c981fbb75fcc8c9f601f07ea20ee99ac4ff4ea3fbda9c068d18b0e9927fb904a";
  const contractHashAsByteArray = [
    ...Buffer.from(constracthash_str.slice(5), "hex"),
  ];

  // MyTuple{Field1: 1, Field2: "Hello, World!", Field3: true}
  let myValue = CLValueBuilder.tuple3([
    new CLValueBuilder.u32(1),
    new CLValueBuilder.string("Hello, World!"),
    new CLValueBuilder.bool(false),
  ]);

  let myValue1 = CLValueBuilder.string("Hello, World!");
  // const myValue = new CLMap([[myKey, myVal]]);

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-net-1",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS,
      []
      // 1676793074000
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "store_map",
      RuntimeArgs.fromMap({
        CLTypeURef_value: myValue,
      })
    ),
    DeployUtil.standardPayment(3000000000)
  );

  // JSON.stringify
  // deploy.session.storedContractByHash.args
  console.log(JSON.stringify(deploy));
  console.log(
    "bodyhash=>",
    Buffer.from(deploy.header.bodyHash).toString("hex")
  );
  console.log(deploy.session.storedContractByHash.args);
  //Step 5.2 Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);

  console.log(`deploy hash = ${deployHash}`);
};

main();

//https://testnet.cspr.live/deploy/ec84ef900e5906d4e7e37fa318022baac4a5fc76b39e5379b4769b31d778dfa3
