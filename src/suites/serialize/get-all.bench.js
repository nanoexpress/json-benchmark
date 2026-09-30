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

report('serialization (getAll)', [
  bench('getAll: fast-json-stringify', () => {
    jsonSchemaGetAllHandler.serialize(getAllData);
  }),
  bench('getAll: msgpackR.pack', () => {
    msgpackRGetAllHandler.serialize(getAllData);
  }),
  bench('getAll: msgpack.encode', () => {
    msgpackGetAllHandler.serialize(getAllData);
  }),
  bench('getAll: avsc.toBuffer', () => {
    avscGetAllHandler.serialize(getAllData);
  }),
  bench('getAll: js-binary.encode', () => {
    jsBinaryGetAllHandler.serialize(getAllData);
  }),
  bench('getAll: v8.serialize', () => {
    v8GetAllHandler.serialize(getAllData);
  }),
  bench('getAll: protobuf.encode', () => {
    protobufGetAllHandler.serialize({
      items: getAllData
    });
  }),
  bench('getAll: bson.serialize', () => {
    BSONGetAllHandler.serialize(getAllData);
  }),
  bench('getAll: bser.dumpToBuffer', () => {
    bserGetAllHandler.serialize(getAllData);
  })
]);
