import { bench, report } from '../../base/bench.js';
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

report('deserialization (getAll)', [
  bench('getAll: JSON.parse', () => {
    jsonSchemaGetAllHandler.deserialize(jsonSchemaSerialized);
  }),
  bench('getAll: msgpackR.unpack', () => {
    msgpackRGetAllHandler.deserialize(msgpackRSerialized);
  }),
  bench('getAll: msgpack.decode', () => {
    msgpackGetAllHandler.deserialize(msgpackSerialized);
  }),
  bench('getAll: avsc.fromBuffer', () => {
    avscGetAllHandler.deserialize(avscSerialized);
  }),
  bench('getAll: js-binary.decode', () => {
    jsBinaryGetAllHandler.deserialize(jsBinarySerialized);
  }),
  bench('getAll: v8.deserialize', () => {
    v8GetAllHandler.deserialize(v8Serialized);
  }),
  bench('getAll: protobuf.decode', () => {
    protobufGetAllHandler.deserialize(protobufSerialized);
  }),
  bench('getAll: BSON.deserialize', () => {
    BSONGetAllHandler.deserialize(BSONSerialized);
  }),
  bench('getAll: bser.loadFromBuffer', () => {
    bserGetAllHandler.deserialize(bserSerialized);
  })
]);
