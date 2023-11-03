import { CasperServiceByJsonRPC } from "casper-js-sdk";
import EventSource from "eventsource";

// set contract hash of cep18
const CONTRACT_HASH =
  "8428d75e377c62d828e3f0cba2bc903d7ff9150c46c3a40916b1949491f0afc6";

const RPC_ENDPOINT = "http://localhost:11101/rpc";
const SSE_DEPLOYS = "http://localhost:18101/events/deploys";

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
  const client = new CasperServiceByJsonRPC(RPC_ENDPOINT);

  const evtSource = new EventSource(SSE_DEPLOYS, {
    withCredentials: false,
  });

  let deploy_hash;

  // consume messages from SSE
  evtSource.onmessage = async (event) => {
    const obj = JSON.parse(event.data);

    if (
      obj["DeployAccepted"] &&
      obj["DeployAccepted"]["session"] &&
      obj["DeployAccepted"]["session"]["StoredContractByHash"]
    ) {
      const contract_from_deploy =
        obj["DeployAccepted"]["session"]["StoredContractByHash"];
      if (
        contract_from_deploy["hash"] == CONTRACT_HASH &&
        (contract_from_deploy["entry_point"] == "mint" ||
          contract_from_deploy["entry_point"] == "burn" ||
          contract_from_deploy["entry_point"] == "transfer")
      ) {
        // deploy_hash
        deploy_hash = obj["DeployAccepted"]["hash"];
        console.log("\ndeploy_hash ==>", deploy_hash);
        console.log("entrypoint==>", contract_from_deploy["entry_point"]);

        //get deploy_info
        let result = await client.getDeployInfo(deploy_hash);

        while (result["execution_results"].length == 0) {
          sleep(1000);
          result = await client.getDeployInfo(deploy_hash);
        }

        if (result["execution_results"][0]["result"]["Success"]) {
          console.log("Success");
          // here are the args where you can get the account
          console.log("args==>", JSON.stringify(contract_from_deploy["args"]));
        } else {
          console.log("Failure");
        }
      }
    }
  };
};

main();
