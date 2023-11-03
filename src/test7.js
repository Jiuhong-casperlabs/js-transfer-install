import { EventStream } from "casper-js-sdk";
import { CEP18Client } from "casper-cep18-js-client";

const main = async () => {
  const cep18 = new CEP18Client(
    "http://localhost:11101/rpc", // Node address
    "casper-net-1" // Network name
  );
  cep18.setContractHash(
    `hash-c6f4b144ce7fbdf446502127abe5ad8add934e891ae06a7960d8006829b245ff`
  );
  await cep18.setupEventStream(
    new EventStream("http://localhost:18101/events/main")
  );
  const listener = (event) => {
    console.log(event.name); // 'Burn'
    console.log(event.data); // Burn event info
  };

  cep18.on("Burn", listener);
};
main();
