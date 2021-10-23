import {
  CLPublicKey
} from "casper-js-sdk";



const main = () => {

  const hexString = '010e31a03ea026a8e375653573e0120c8cb96699e6c9721ae1ea98f896e6576ac3';

  const result = CLPublicKey.fromHex(hexString).toAccountHashStr()
  console.log("result:",result)

};

main();

//https://testnet.cspr.live/deploy/9d242efa3fab8b5191a2eabe8922da9d4fa9f9f94328efecb31fe6de09f57d15
