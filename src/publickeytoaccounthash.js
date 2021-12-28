import {
  CLPublicKey
} from "casper-js-sdk";



const main = () => {

  const hexString = '010e31a03ea026a8e375653573e0120c8cb96699e6c9721ae1ea98f896e6576ac3';

  //account-hash-d9758b25962f4cba82ba0047389af97a70acb7df43b391f9ffb293801bea5061
  const result2 = CLPublicKey.fromHex(hexString).toAccountHashStr()
  console.log("result2:",result2)

  //d9758b25962f4cba82ba0047389af97a70acb7df43b391f9ffb293801bea5061
  const result = Buffer.from(CLPublicKey.fromHex(hexString).toAccountHash()).toString('hex')
  console.log("result:", result)
  
  //to accounthash
  const result3 = CLPublicKey.fromHex(hexString).toAccountHash()
  console.log("result3:",result3)


};

main();

//https://testnet.cspr.live/deploy/9d242efa3fab8b5191a2eabe8922da9d4fa9f9f94328efecb31fe6de09f57d15
