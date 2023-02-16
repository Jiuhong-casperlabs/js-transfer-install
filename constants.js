// Path to caller contract
export const PATH_TO_CALLERCONTRACT = `${process.env.HOME}/mywork/callstack/target/wasm32-unknown-unknown/release/callercontract.wasm`;

// Path to borrow contract
export const PATH_TO_CONTRACT_BORROW = `${process.env.HOME}/rust/test27/contract/target/wasm32-unknown-unknown/release/contract.wasm`;
export const PATH_TO_CONTRACT_ACCOUNT_ACCESS = `${process.env.HOME}/rust/test53/contract/target/wasm32-unknown-unknown/release/contract.wasm`;
export const PATH_TO_STORE_KEYS = `${process.env.HOME}/rust/test53/contract/target/wasm32-unknown-unknown/release/contract.wasm`;

export const PATH_TO_CONTRACT_CASPER_IDO = `${process.env.HOME}/test/test1/casperpad-ido/target/wasm32-unknown-unknown/release/casper_ido_contract.wasm`;

// Path to folder containing keys with which to operate smart contract.
export const PATH_TO_CONTRACT_KEYS = `${process.env.NCTL}/assets/net-1/faucet`;
// export const PATH_TO_CONTRACT_KEYS =  `/home/jiuhong/nctl/casper-node/utils/nctl/assets/net-1/faucet`;

// Path to folder containing keys with which to act as a test faucet.
export const PATH_TO_FAUCET_KEYS =
  process.env.CSPR_INTS_PATH_TO_FAUCET_KEYS ||
  `${process.env.NCTL}/assets/net-1/faucet`;

// Path to source keys
// export const PATH_TO_SOURCE_KEYS = `${process.env.HOME}/casper-node/utils/nctl/assets/net-1/users/user-1`;
// export const PATH_TO_SOURCE_KEYS = `${process.env.HOME}/casper-node/utils/nctl/assets/net-1/users/user-1`;
// export const PATH_TO_SOURCE_KEYS = `/home/jh/casper-node/utils/nctl/assets/net-1/faucet`;
// export const PATH_TO_SOURCE_KEYS = `${process.env.HOME}/keys/test2`;
export const PATH_TO_SOURCE_KEYS = `${process.env.HOME}/keys/test1`;

//Path to target keys
// export const PATH_TO_TRAGET_KEYS = `${process.env.HOME}/keys/test2`;
export const PATH_TO_TRAGET_KEYS = `${process.env.HOME}/casper-node/utils/nctl/assets/net-1/users/user-2`;

// path to signing keys
export const PATH_TO_SIGN_KEY1 = `${process.env.HOME}/keys/test1`;
export const PATH_TO_SIGN_KEY2 = `${process.env.HOME}/keys/test2`;
//Path to test11 which has KVstorage contract installed
export const PATH_TO_KV_KEYS = `${process.env.HOME}/keys/test1`;
export const PATH_TO_CALLLOCKED = `${process.env.HOME}/keys/test98`;
export const PATH_LIST_KEY98 = `${process.env.HOME}/keys/test98`;
export const PATH_LIST_KEY11 = `${process.env.HOME}/keys/test11`;

export const PATH_TO_BALANCE = `${process.env.HOME}/keys/test30`;

//Path to test11 which has KVstorage contract installed
export const PATH_TO_CEP47_KEYS = `${process.env.HOME}/keys/test1`;

// Path to folder containing keys with which to act as test users.
export const PATH_TO_USERS =
  process.env.CSPR_INTS_PATH_TO_USERS ||
  `${process.env.NCTL}/assets/net-1/users`;

// Path to folder containing keys with which to act as test validators.
export const PATH_TO_VALIDATORS =
  process.env.CSPR_INTS_PATH_TO_VALIDATORS ||
  `${process.env.NCTL}/assets/net-1/nodes`;

// Path to an ERC20 samrt contract wasm file.
export const PATH_TO_CONTRACTS =
  process.env.PATH_TO_CONTRACTS ||
  `${process.env.HOME}/mywork/contractsworkspace/target/wasm32-unknown-unknown/release/storecontract.wasm`;

export const PATH_TO_CONTRACT_ERC_20 =
  process.env.PATH_TO_CONTRACT_ERC_20 ||
  `/home/jh/caspereco/erc20/target/wasm32-unknown-unknown/release/erc20_token.wasm`;
// `/home/jh/caspereco/casper-nft-cep47/target/wasm32-unknown-unknown/release/cep47-token.wasm`;
// Path to an ERC20 samrt contract wasm file.
export const PATH_TO_LOCKED = `${process.env.HOME}/casperecosystem/uref-sharing-example/target/wasm32-unknown-unknown/release/locked.wasm`;

export const PATH_TO_LOCKED1 = `${process.env.HOME}/rust/urefshare_working/target/wasm32-unknown-unknown/release/locked.wasm`;

// Path to an CASK samrt contract wasm file.
export const PATH_TO_CONTRACT_CASK =
  process.env.PATH_TO_CONTRACT_CASK ||
  `${process.env.HOME}/caspereco/CaskNFT/target/wasm32-unknown-unknown/release/cask-token.wasm`;

// Path to an AUCTION samrt contract wasm file.
export const PATH_TO_CONTRACT_AUCTION =
  process.env.PATH_TO_CONTRACT_AUCTION ||
  `${process.env.HOME}/caspereco/casper-private-auction/target/wasm32-unknown-unknown/release/casper-private-auction-installer.wasm`;

// Name of target chain.
export const DEPLOY_CHAIN_NAME =
  // process.env.CSPR_INTS_DEPLOY_CHAIN_NAME || "casper-net-1";
  process.env.CSPR_INTS_DEPLOY_CHAIN_NAME || "casper-test";

// Gas payment to be offered.
export const DEPLOY_GAS_PAYMENT_FOR_INSTALL =
  process.env.CSPR_INTS_DEPLOY_GAS_PAYMENT || 5000000000;

// Gas payment for native transfers to be offered.
export const DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER =
  process.env.CSPR_INTS_DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER || 100000;

// Gas payment for native transfers to be offered.
export const DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER =
  process.env.CSPR_INTS_DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER || 3000000000;

// Gas price to be offered.
export const DEPLOY_GAS_PRICE = process.env.CSPR_INTS_DEPLOY_GAS_PRICE
  ? parseInt(process.env.CSPR_INTS_DEPLOY_GAS_PRICE)
  : 1;

// Address of target node.
export const DEPLOY_NODE_ADDRESS =
  // process.env.CSPR_INTS_DEPLOY_NODE_ADDRESS || "http://localhost:11101/rpc";
  // process.env.CSPR_INTS_DEPLOY_NODE_ADDRESS || "http://3.208.91.63:7777/rpc";
  // process.env.CSPR_INTS_DEPLOY_NODE_ADDRESS || "http://94.130.10.55:7777/rpc";
  process.env.CSPR_INTS_DEPLOY_NODE_ADDRESS ||
  "https://rpc.testnet.casperlabs.io/rpc";

// Time interval in milliseconds after which deploy will not be processed by a node.
export const DEPLOY_TTL_MS = process.env.CSPR_INTS_DEPLOY_TTL_MS || 1800000;
