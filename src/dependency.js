import {
  DeployUtil,
  CasperServiceByJsonRPC,
  RuntimeArgs,
  decodeBase16,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const PATH_TO_CONTRACT =
  "/home/jh/mywork/helloworld/contract/target/wasm32-unknown-unknown/release/contract.wasm";
const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC(constants.DEPLOY_NODE_ADDRESS);

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(
    constants.PATH_TO_CEP47_KEYS
  );

  // step1: install hello world contract
  let firstDeploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      decodeBase16(
        "8b896afab399dd2687c50003481b89005ed935183574888d4400090d027d4efc"
      ),
      "hello_world",
      RuntimeArgs.fromMap({ b: 2 })
    ),
    DeployUtil.standardPayment(
      constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
    )
  );

  // Sign deploy.
  firstDeploy = DeployUtil.signDeploy(firstDeploy, keyPairofContract);

  //step1: second deploy
  const dependencies = [firstDeploy.hash];
  let secondDeploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS,
      dependencies
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      decodeBase16(
        "8b896afab399dd2687c50003481b89005ed935183574888d4400090d027d4efc"
      ),
      "hello_world",
      RuntimeArgs.fromMap({ a: 1 })
    ),
    DeployUtil.standardPayment(
      constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
    )
  );

  //Step 5.2 Sign deploy.
  secondDeploy = DeployUtil.signDeploy(secondDeploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.

  //Step 5.3 Dispatch deploy to node.
  let firstDeployHash = await client.deploy(firstDeploy);
  // let secondDeployHash = await client.deploy(secondDeploy);

  console.log(` first deploy hash = ${firstDeployHash}`);

  console.log(` second deploy hash = ${secondDeployHash}`);
};

main();

//https://testnet.cspr.live/deploy/9d242efa3fab8b5191a2eabe8922da9d4fa9f9f94328efecb31fe6de09f57d15
