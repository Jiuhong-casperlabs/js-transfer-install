import {
  DeployUtil,
  RuntimeArgs,
  CLPublicKey,
  CasperServiceByJsonRPC,
  CLByteArray,
  CLValueBuilder,
  CLAccountHash,
  CLString,
  CLU64,
  CLU8,
  CLList,
} from "casper-js-sdk";
import * as utils from "../utils";
import * as constants from "../constants";

const main = async () => {
  //Step 1: Set casper node client
  // const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");
  const client = new CasperServiceByJsonRPC(
    "https://rpc.testnet.casperlabs.io/rpc"
  );
  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(`/home/jh/keys/worker1`);

  // --session-path /home/jh/caspereco/cep-78-enhanced-nft/contract/target/wasm32-unknown-unknown/release/contract.wasm \
  // --session-arg "collection_name:string='CPSR TST '" \
  const collection_name = new CLString("CPSR TST ");
  // --session-arg "collection_symbol:string='COO'" \
  const collection_symbol = new CLString("COO");
  // --session-arg "total_token_supply:u64='100'" \
  const total_token_supply = new CLU64("100");
  // --session-arg "ownership_mode:u8='2'" \
  const ownership_mode = new CLU8(2);
  // --session-arg "burn_mode:u8='0'" \
  const burn_mode = new CLU8(0);
  // --session-arg "nft_kind:u8='1'" \
  const nft_kind = new CLU8(1);
  // --session-arg "nft_metadata_kind:u8='2'" \
  const nft_metadata_kind = new CLU8(2);
  // --session-arg "minting_mode:u8='2'" \
  const minting_mode = new CLU8(2);
  // --session-arg "whitelist_mode:u8='0'" \
  const whitelist_mode = new CLU8(0);
  // --session-arg "json_schema:string='{\"properties\":{\"color\":{\"name\":\"minteandome\",\"description\":\"Minteandome SmartContract\",\"required\":true}}}'" \
  const json_schema = new CLString(
    '\'{"properties":{"color":{"name":"minteandome","description":"Minteandome SmartContract","required":true}}}\''
  );
  // --session-arg "identifier_mode:u8='0'" \
  const identifier_mode = new CLU8("0");
  // --session-arg "owner_reverse_lookup_mode:u8='0'" \
  const owner_reverse_lookup_mode = new CLU8("0");
  // --session-arg "events_mode:u8:'1'" \
  const events_mode = new CLU8("1");
  // --session-arg "metadata_mutability:u8='1'"
  const metadata_mutability = new CLU8("1");
  const acl_whitelist = new CLList([
    new CLString(
      "01f8c5cb2750adca87490dee7d71344775e479d1d63b5976c664eae4dc5d2c246b"
    ),
  ]);

  // "acl_whitelist",
  // {
  //     "cl_type": {
  //         "List": "String"
  //     },
  //     "bytes": "0100000042000000303166386335636232373530616463613837343930646565376437313334343737356534373964316436336235393736633636346561653464633564326332343662",
  //     "parsed": [
  //         "01f8c5cb2750adca87490dee7d71344775e479d1d63b5976c664eae4dc5d2c246b"
  //     ]
  // }

  const PATH_TO_CONTRACT = `/home/jh/caspereco/cep-78-enhanced-nft/contract/target/wasm32-unknown-unknown/release/contract.wasm`;
  // const PATH_TO_CONTRACT = `/home/jh/rust/test113/contract/target/wasm32-unknown-unknown/release/contract.wasm`;

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      "casper-test",
      // constants.DEPLOY_GAS_PRICE,
      2,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({
        collection_name,
        collection_symbol,
        total_token_supply,
        ownership_mode,
        burn_mode,
        nft_kind,
        nft_metadata_kind,
        minting_mode,
        whitelist_mode,
        json_schema,
        identifier_mode,
        owner_reverse_lookup_mode,
        events_mode,
        metadata_mutability,
        acl_whitelist,
      })
    ),
    DeployUtil.standardPayment(1200000000000)
  );

  //Step 5.2 Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  // Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log("deployHash", deployHash);
};

main();
