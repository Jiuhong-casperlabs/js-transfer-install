import { decodeBase16 } from "casper-js-sdk";
import {
  parseSchemasFromBytes,
  parseEventNameAndData,
} from "@make-software/ces-js-parser";

const main = () => {
  // value stored under __events_schema",
  const schemaHex =
    "02000000060000004d794f626a3102000000040000006e616d650a0400000073697a65130707060000004d794f626a3202000000040000006e616d650a05000000677261646507";
  const schemas = parseSchemasFromBytes(decodeBase16(schemaHex));
  const transformBytes =
    //   deploys including emit -  dictionary-xxxx
    "200000001c0000000c0000006576656e745f4d794f626a3205000000677261706502d5dd0e032000000093573167d6cd289024a08c16cb5e64c65f7247159e41e4ae046e7bdc0e32ec130100000031";
  const eventNameAndData = parseEventNameAndData(transformBytes, schemas);
  console.log(JSON.stringify(eventNameAndData));
};

main();
