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

// Caches & Serialized content
const jsonSchemaSerialized = jsonSchemaGetAllHandler.serialize(getAllData);
const msgpackRSerialized = msgpackRGetAllHandler.serialize(getAllData);
const msgpackSerialized = msgpackGetAllHandler.serialize(getAllData);
const avscSerialized = avscGetAllHandler.serialize(getAllData);
const jsBinarySerialized = jsBinaryGetAllHandler.serialize(getAllData);
const v8Serialized = v8GetAllHandler.serialize(getAllData);
const protobufSerialized = protobufGetAllHandler.serialize({
  items: getAllData
});
const BSONSerialized = BSONGetAllHandler.serialize(getAllData);
const bserSerialized = bserGetAllHandler.serialize(getAllData);

describe('deserialization', () => {
  test('getAll: JSON.parse', async ({ bench }) => {
    await bench('getAll: JSON.parse', () => {
      jsonSchemaGetAllHandler.deserialize(jsonSchemaSerialized);
    }).run(globalBenchConfig);
  });
  test('getAll: msgpackR.unpack', async ({ bench }) => {
    await bench('getAll: msgpackR.unpack', () => {
      msgpackRGetAllHandler.deserialize(msgpackRSerialized);
    }).run(globalBenchConfig);
  });
  test('getAll: msgpack.decode', async ({ bench }) => {
    await bench('getAll: msgpack.decode', () => {
      msgpackGetAllHandler.deserialize(msgpackSerialized);
    }).run(globalBenchConfig);
  });
  test('getAll: avsc.fromBuffer', async ({ bench }) => {
    await bench('getAll: avsc.fromBuffer', () => {
      avscGetAllHandler.deserialize(avscSerialized);
    }).run(globalBenchConfig);
  });
  test('getAll: js-binary.decode', async ({ bench }) => {
    await bench('getAll: js-binary.decode', () => {
      jsBinaryGetAllHandler.deserialize(jsBinarySerialized);
    }).run(globalBenchConfig);
  });
  test('getAll: v8.deserialize', async ({ bench }) => {
    await bench('getAll: v8.deserialize', () => {
      v8GetAllHandler.deserialize(v8Serialized);
    }).run(globalBenchConfig);
  });
  test('getAll: protobuf.decode', async ({ bench }) => {
    await bench('getAll: protobuf.decode', () => {
      protobufGetAllHandler.deserialize(protobufSerialized);
    }).run(globalBenchConfig);
  });
  test('getAll: BSON.deserialize', async ({ bench }) => {
    await bench('getAll: BSON.deserialize', () => {
      BSONGetAllHandler.deserialize(BSONSerialized);
    }).run(globalBenchConfig);
  });
  test('getAll: bser.loadFromBuffer', async ({ bench }) => {
    await bench('getAll: bser.loadFromBuffer', () => {
      bserGetAllHandler.deserialize(bserSerialized);
    }).run(globalBenchConfig);
  });
});
