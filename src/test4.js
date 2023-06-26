/**
 * @fileOverview CSPR JS SDK demo: ERC20 - install contract.
 */

import {
  CasperClient,
  CLByteArray,
  DeployUtil,
  RuntimeArgs,
  CasperServiceByJsonRPC,
  CLString,
  CLU8,
  CLU512,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT = `/home/jh/test/xp-casper-integration/client-rs/freeze-nft/target/wasm32-unknown-unknown/release/freeze_nft_call.wasm`;

const main = async () => {
  // Step 1: Set casper node client.
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  // Step 2: Set contract operator key pair.

  const keyPairofContract = utils.getKeyPairOfContract(
    `/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1`
  );

  // cep78
  const cep78_hash =
    "186920323eff953a3897d9e5518daf58e74c47c0b71a016e495c9f36579c36c4";
  const contract = new CLByteArray(
    Uint8Array.from(Buffer.from(cep78_hash, "hex"))
  );
  // xp
  const xp_hash =
    "5927606db903f1825e57f7c4aadb971434615fe5b84464798a8e55fd9205d10f";
  const bridge_contract = new CLByteArray(
    Uint8Array.from(Buffer.from(xp_hash, "hex"))
  );
  const mint_with = new CLString("0x0d7df42014064a163DfDA404253fa9f6883b9187");
  const token_id = new CLString("1");
  const to = new CLString("0x0d7df42014064a163DfDA404253fa9f6883b9187");
  const chain_nonce = new CLU8(4);
  const amount = new CLU512(100);
  const sig_data_str =
    "bde3b5ceff70d15dd5f1de9fb9a94156de985b15d1c63de0560227e9ef6bbea2054dca995c79761fae2e1cea932e1571468406702f2c7ef3c27d16d817aae102";
  const sig_data = new CLByteArray(
    Uint8Array.from(Buffer.from(sig_data_str, "hex"))
  );

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-net-1",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),

    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({
        contract,
        bridge_contract,
        mint_with,
        token_id,
        to,
        chain_nonce,
        amount,
        sig_data,
      })
    ),
    DeployUtil.standardPayment(200000000000)
  );

  // Step 4: Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  // Step 5: Dispatch deploy to node.
  const deployHash = await client.deploy(deploy);
  // Step 6: Render deploy details.
  console.log("deployHash", deployHash);
};

main();
