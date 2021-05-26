import { Packr, pack, unpack } from 'msgpackr';
import { BasePreare } from '../base/index.js';

const fromHandler = packr => data => packr.pack(data);
const toHandler = packr => data => packr.unpack(data);

const getAllHandler = new BasePreare(new Packr());
getAllHandler.setSerializer(fromHandler);
getAllHandler.setDeserializer(toHandler);

// provide a structures array if we want to preserve the structure across test iterations
const getOneHandler = new BasePreare(new Packr({ structures: [] }));
getOneHandler.setSerializer(fromHandler);
getOneHandler.setDeserializer(toHandler);

const healthHandler = new BasePreare(new Packr({ structures: [] }));
healthHandler.setSerializer(fromHandler);
healthHandler.setDeserializer(toHandler);

export { getAllHandler, getOneHandler, healthHandler };
