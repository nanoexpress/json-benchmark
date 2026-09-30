import { describe, test } from 'vitest';
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
/** @type {import('vitest').BenchRunOptions} */
const globalBenchConfig = {
  iterations: 2_000,
  warmupIterations: 5,
  now: process.now,
  throws: true
};

describe('serialization', () => {
  test('getAll: fast-json-stringify', async ({ bench }) => {
    await bench(
      'getAll: fast-json-stringify',
      () => {
        jsonSchemaGetAllHandler.serialize(getAllData);
      }
    ).run(globalBenchConfig);
  });
  test('getAll: msgpackR.pack', async ({ bench }) => {
    await bench(
      'getAll: msgpackR.pack',
      () => {
        msgpackRGetAllHandler.serialize(getAllData);
      }
    ).run(globalBenchConfig);
  });
  test('getAll: msgpack.encode', async ({ bench }) => {
    await bench(
      'getAll: msgpack.encode',
      () => {
        msgpackGetAllHandler.serialize(getAllData);
      }
    ).run(globalBenchConfig);
  });
  test('getAll: avsc.toBuffer', async ({ bench }) => {
    await bench(
      'getAll: avsc.toBuffer',
      () => {
        avscGetAllHandler.serialize(getAllData);
      }
    ).run(globalBenchConfig);
  });
  test('getAll: js-binary.encode', async ({ bench }) => {
    await bench(
      'getAll: js-binary.encode',
      () => {
        jsBinaryGetAllHandler.serialize(getAllData);
      }
    ).run(globalBenchConfig);
  });
  test('getAll: v8.serialize', async ({ bench }) => {
    await bench(
      'getAll: v8.serialize',
      () => {
        v8GetAllHandler.serialize(getAllData);
      }
    ).run(globalBenchConfig);
  });
  test('getAll: protobuf.encode', async ({ bench }) => {
    await bench(
      'getAll: protobuf.encode',
      () => {
        protobufGetAllHandler.serialize({
          items: getAllData
        });
      }
    ).run(globalBenchConfig);
  });
  test('getAll: bson.serialize', async ({ bench }) => {
    await bench(
      'getAll: bson.serialize',
      () => {
        BSONGetAllHandler.serialize(getAllData);
      }
    ).run(globalBenchConfig);
  });
  test('getAll: bser.dumpToBuffer', async ({ bench }) => {
    await bench(
      'getAll: bser.dumpToBuffer',
      () => {
        bserGetAllHandler.serialize(getAllData);
      }
    ).run(globalBenchConfig);
  });
});
