import {
    CLValueParsers,
    CLPublicKey,
    CLTypeBuilder,
    CLValue,
    CLValueBuilder,
    EventName,
    Keys,
    RuntimeArgs,
  } from "casper-js-sdk";
  import { Some, None } from "ts-results";
  import {
    CasperContractClient,
    constants,
    utils,
    helpers,
    types,
  } from "casper-js-client-helper";
  const { DEFAULT_TTL } = constants;
  import { LockUnlockEvents } from "./constants_lock_unlock";
  import { concat } from "@ethersproject/bytes";
  import blake from "blakejs";
  const {
    fromCLMap,
    toCLMap,
    installContract,
    setClient,
    contractSimpleGetter,
    contractCallFn,
    createRecipientAddress,
  } = helpers;
  // TODO: Refactor in both clients
  type RecipientType = types.RecipientType;
  type IPendingDeploy = types.IPendingDeploy;
  type IClassContractCallParams = types.IClassContractCallParams;
  
  class LockUnlockClient extends CasperContractClient {
    protected namedKeys?: {
      balances: string;
      metadata: string;
      ownedTokensByIndex: string;
      owners: string;
      issuers: string;
      paused: string;
      events: string;
    };
  
    public async install(
      keys: Keys.AsymmetricKey,
      amount: string,
      paymentAmount: string,
      wasmPath: string
    ) {
      const runtimeArgs = RuntimeArgs.fromMap({
        token_name: CLValueBuilder.u512(amount),
      });
  
      return await installContract(
        this.chainName,
        this.nodeAddress,
        keys,
        runtimeArgs,
        paymentAmount,
        wasmPath
      );
    }
  
    public async setContractHash(hash: string) {
      const LIST_OF_NAMED_KEYS = [
        "balances",
        "metadata",
        "owned_tokens_by_index",
        "owners",
        "issuers",
        "paused",
        "events",
      ];
  
      const { contractPackageHash, namedKeys } = await setClient(
        this.nodeAddress,
        hash,
        LIST_OF_NAMED_KEYS
      );
      this.contractHash = hash;
      this.contractPackageHash = contractPackageHash.replace(
        "contract-package-wasm",
        ""
      );
      /* @ts-ignore */
      this.namedKeys = namedKeys;
    }
  
    public async lockCSPR(
      keys: Keys.AsymmetricKey,
      bsc_recipient_address: string,
      amount: string,
      paymentAmount: string,
      ttl = DEFAULT_TTL,
      dependencies = []
    ) {
      const runtimeArgs = RuntimeArgs.fromMap({
        amount: CLValueBuilder.u256(amount),
        bsc_recipient_address: CLValueBuilder.string(bsc_recipient_address),
      });
  
      return await this.contractCall({
        entryPoint: "lock_cspr",
        paymentAmount,
        keys: keys,
        runtimeArgs,
        cb: (deployHash) =>
          this.addPendingDeploy(LockUnlockEvents.LockCSPR, deployHash),
        ttl,
        dependencies
      });
    }
  
    public async unLockCSPR(
      keys: Keys.AsymmetricKey,
      receipient_str:string,
      bsc_transaction_hash: string,
      amount: string,
      paymentAmount: string,
      ttl = DEFAULT_TTL,
      dependencies = []
    ) {
      const runtimeArgs = RuntimeArgs.fromMap({
        amount: CLValueBuilder.u256(amount),
        receipient_str: CLValueBuilder.string(receipient_str),
        bsc_transaction_hash: CLValueBuilder.string(bsc_transaction_hash),
      });
  
      return await this.contractCall({
        entryPoint: "unlock_cspr",
        paymentAmount,
        keys: keys,
        runtimeArgs,
        cb: (deployHash) =>
          this.addPendingDeploy(LockUnlockEvents.LockCSPR, deployHash),
        ttl,
        dependencies
      });
    }
  
  
    public onEvent(
      eventNames: LockUnlockEvents[],
      callback: (
        eventName: LockUnlockEvents,
        deployStatus: {
          deployHash: string;
          success: boolean;
          error: string | null;
        },
        result: any | null
      ) => void
    ): any {
      return this.handleEvents(eventNames, callback);
    }
  }
  
  export default LockUnlockClient;
  