/**
 * @fileOverview CSPR JS SDK demo: ERC20 - fund users.
 */

import _ from "lodash";
import {
  CasperServiceByJsonRPC,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Amount that each user account will be approved  to withdraw.
const AMOUNT_TO_APPROVE = 1000000000000;

/**
 * Demonstration entry point.
 */
const main = async () => {
  // Step 1: Set casper node client.
  const client = new CasperServiceByJsonRPC(constants.DEPLOY_NODE_ADDRESS);

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getKeyPairOfContract(
    constants.PATH_TO_SOURCE_KEYS
  );

  const keyPairofTarget = utils.getKeyPairOfContract(
    constants.PATH_TO_TRAGET_KEYS
  );

  // Step 3: Query node for global state root hash.
  const stateRootHash = await utils.getStateRootHash(client);

  // Step 4: Query node for contract hash.
  const contractHash = await utils.getAccountNamedKeyValue(
    client,
    stateRootHash,
    keyPairOfContract,
    "ERC20"
  );
  const contractHashAsByteArray = [
    ...Buffer.from(contractHash.slice(5), "hex"),
  ];

  // Step 5: Invoke contract approve endpoint.
  const deployHashes = [];

  // Step 5.1: Set deploy.
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "approve",
      RuntimeArgs.fromMap({
        amount: CLValueBuilder.u256(AMOUNT_TO_APPROVE),
        spender: CLValueBuilder.byteArray(keyPairOfContract.accountHash()),
      })
    ),
    DeployUtil.standardPayment(
      constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
    )
  );

  // Step 5.2: Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairOfContract);

  // Step 5.3: Dispatch deploy to node.

  let deployHash = await client.deploy(deploy);

  // Step 6: Render details.

  console.log(
    `approving ${AMOUNT_TO_APPROVE} tokens -> user ${keyPairofTarget} :: deploy hash = ${deployHash}`
  );
};

main();
