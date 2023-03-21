/**
 * @fileOverview CSPR JS SDK demo: Native transfers.
 */
import { DeployUtil } from "casper-js-sdk";

const main = async () => {
  let deploy = DeployUtil.deployFromJson({
    deploy: {
      approvals: [
        {
          signature:
            "01f8625d3e9b2babc13d789438aced80dd55083f17203a6ba814264df881f0454bb883e90335abc82efe7b47fb4c843710f08b4f547c9f2953c9226f7c11f6db06",
          signer:
            "01553b2b5db0aa64b040642e0d622b28db58e36c8a05af334585208fab4221124b",
        },
      ],
      hash: "626d973a832fa0145dcf5f1d05d9ae5b5d34860689a824acc603689fe18cbb47",
      header: {
        account:
          "01553b2b5db0aa64b040642e0d622b28db58e36c8a05af334585208fab4221124b",
        body_hash:
          "097abd441ed230a762e8327618fd16254d0bdb09c48225ec3ad147219f0583c6",
        chain_name: "casper-net-1",
        dependencies: [],
        gas_price: 1,
        timestamp: "2023-02-19T11:11:23.881Z",
        ttl: "30m",
      },
      payment: {
        ModuleBytes: {
          args: [
            [
              "amount",
              {
                bytes: "04005ed0b2",
                cl_type: "U512",
                parsed: "3000000000",
              },
            ],
          ],
          module_bytes: "",
        },
      },
      session: {
        StoredContractByHash: {
          args: [
            [
              "CLTypeURef_value",
              {
                bytes: "010000000d00000048656c6c6f2c20576f726c642100",
                cl_type: {
                  Tuple3: ["U32", "String", "Bool"],
                },
                parsed: [1, "Hello, World!", false],
              },
            ],
          ],
          entry_point: "store_map",
          hash: "c981fbb75fcc8c9f601f07ea20ee99ac4ff4ea3fbda9c068d18b0e9927fb904a",
        },
      },
    },
  }).unwrap();

  let deploy_serialize = Buffer.from(DeployUtil.deployToBytes(deploy)).toString(
    "hex"
  );
  console.log("deploy_serialize  is \n", deploy_serialize);

  let session_serialize = Buffer.from(deploy.session.toBytes().val).toString(
    "hex"
  );
  console.log("session_serialize  is \n", session_serialize);
};

main();
