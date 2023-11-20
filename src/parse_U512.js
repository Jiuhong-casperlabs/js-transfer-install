import { CLValueParsers } from "casper-js-sdk";

const main = async () => {
  // parse bytes
  const expectedJson = JSON.parse('{"bytes":"050088526a74","cl_type":"U512"}');

  console.log(CLValueParsers.fromJSON(expectedJson).unwrap().data.toString());
};

main();
