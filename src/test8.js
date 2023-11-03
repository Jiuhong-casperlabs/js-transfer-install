import { EventStream, EventName } from "casper-js-sdk";
import { CEP18Client } from "casper-cep18-js-client";

const main = async () => {
  const startEventStream = async (url) => {
    const es = new EventStream(url);
    es.start();
    let deployProcessedEvent;
    es.subscribe(EventName.DeployProcessed, (res) => {
      deployProcessedEvent = res;
      console.log(JSON.stringify(deployProcessedEvent));
    });
  };

  await startEventStream("http://65.109.145.211:9999/events/main");
};
main();
