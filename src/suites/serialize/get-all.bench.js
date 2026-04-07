import { bench, describe } from 'vitest';
import getAllData from '../../data/get-all.json' with { type: 'json' };
import { getAllHandler as avscGetAllHandler } from '../../handlers/avsc.js';
import { getAllHandler as bserGetAllHandler } from '../../handlers/bser.js';
import { getAllHandler as BSONGetAllHandler } from '../../handlers/bson.js';
import { getAllHandler as jsBinaryGetAllHandler } from '../../handlers/js-binary.js';
import { getAllHandler as jsonSchemaGetAllHandler } from '../../handlers/json-schema.js';
import { getAllHandler as msgpackGetAllHandler } from '../../handlers/msgpack.js';
import { getAllHandler as msgpackRGetAllHandler } from '../../handlers/msgpackr.js';
import { getAllHandler as protobufGetAllHandler } from '../../handlers/protobuf.js';
import { getAllHandler as v8GetAllHandler } from '../../handlers/v8.js';

/**
 * DO NOT TOUCH
 * THIS IS TESTING CONSTANT
 */
/** @type {import('vitest').BenchOptions} */
const globalBenchConfig = {
  iterations: 2_000,
  warmupIterations: 5,
  now: process.now,
  throws: true
};

describe('serialization', () => {
  bench(
    'getAll: fast-json-stringify',
    () => {
      jsonSchemaGetAllHandler.serialize(getAllData);
    },
    globalBenchConfig
  );
  bench(
    'getAll: msgpackR.pack',
    () => {
      msgpackRGetAllHandler.serialize(getAllData);
    },
    globalBenchConfig
  );
  bench(
    'getAll: msgpack.encode',
    () => {
      msgpackGetAllHandler.serialize(getAllData);
    },
    globalBenchConfig
  );
  bench(
    'getAll: avsc.toBuffer',
    () => {
      avscGetAllHandler.serialize(getAllData);
    },
    globalBenchConfig
  );
  bench(
    'getAll: js-binary.encode',
    () => {
      jsBinaryGetAllHandler.serialize(getAllData);
    },
    globalBenchConfig
  );
  bench(
    'getAll: v8.serialize',
    () => {
      v8GetAllHandler.serialize(getAllData);
    },
    globalBenchConfig
  );
  bench(
    'getAll: protobuf.encode',
    () => {
      protobufGetAllHandler.serialize({
        items: getAllData
      });
    },
    globalBenchConfig
  );
  bench(
    'getAll: bson.serialize',
    () => {
      BSONGetAllHandler.serialize(getAllData);
    },
    globalBenchConfig
  );
  bench(
    'getAll: bser.dumpToBuffer',
    () => {
      bserGetAllHandler.serialize(getAllData);
    },
    globalBenchConfig
  );
});
