import blake from 'blakejs';

const main = async () => {
  const body_serialization = "020e0000006361737065722d6578616d706c65130000006578616d706c652d656e7472792d706f696e7401000000080000007175616e7469747904000000e803000001050100000006000000616d6f756e7404000000e803000001";
  
  const body_Uint8Array = Uint8Array.from(Buffer.from(body_serialization, 'hex'));
  console.log("body_Uint8Array is ",body_Uint8Array)
  const bodyHash = blake.blake2b(body_Uint8Array, null, 32);
  console.log("bodyHash_Uint8Array is ",bodyHash)

  const backToHexString = Buffer.from(bodyHash).toString('hex');
  console.log("bodyHash_HexString is ",backToHexString)

};
main();
