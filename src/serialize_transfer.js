/**
 * @fileOverview CSPR JS SDK demo: Native transfers.
 */
import { DeployUtil } from "casper-js-sdk";

const main = async () => {
  let deploy = DeployUtil.deployFromJson({
    deploy: {
      hash: "bba5fb89a48f71e6d00077a56854df3bbafb7ad4c1332f3956f1c2f2f97257fe",
      header: {
        ttl: "30m",
        account:
          "02033d06a3e1f9b96cf353f4086620b6e0529035eb1f02805cb67e8831c372488d4f",
        body_hash:
          "a3f5147282396f8c0bdb7984c62374d9899b6c6cc953a3909c6c1fa1232cd93c",
        gas_price: 1,
        timestamp: "2022-04-23T09:38:21.700Z",
        chain_name: "casper-test",
        dependencies: [],
      },
      payment: {
        ModuleBytes: {
          args: [
            [
              "amount",
              {
                bytes: "0400e1f505",
                parsed: "100000000",
                cl_type: "U512",
              },
            ],
          ],
          module_bytes: "",
        },
      },
      session: {
        Transfer: {
          args: [
            [
              "amount",
              {
                bytes: "050026e85a05",
                parsed: "23000000000",
                cl_type: "U512",
              },
            ],
            [
              "target",
              {
                bytes:
                  "0202a6e2d25621758e2c92900f842ff367bbb5e4b6a849cacb43c3eaebf371b24b85",
                parsed:
                  "0202a6e2d25621758e2c92900f842ff367bbb5e4b6a849cacb43c3eaebf371b24b85",
                cl_type: "PublicKey",
              },
            ],
            [
              "id",
              {
                bytes: "01a223c95580010000",
                parsed: 1650706686882,
                cl_type: {
                  Option: "U64",
                },
              },
            ],
          ],
        },
      },
      approvals: [
        {
          signer:
            "02033d06a3e1f9b96cf353f4086620b6e0529035eb1f02805cb67e8831c372488d4f",
          signature:
            "02e2118901d6bb3758cff81a996c5a7229671bf62843bfdb3658757436431b6d9869c801113916491c70cc6e151851b7aa9e48d5d75e77bf986d0e2bde0b7fa1df",
        },
      ],
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
