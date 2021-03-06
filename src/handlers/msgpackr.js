import { pack, unpack } from 'msgpackr';
import { BasePreare } from '../base/index.js';

const fromHandler = () => pack;
const toHandler = () => unpack;
/*const config = {
  cache: null,
  mapsAsObjects: true,
  getStructures() {
    return this.cache || [];
  },
  saveStructures(structures) {
    this.cache = pack(structures);
  }
};*/

const getAllHandler = new BasePreare({});
// getAllHandler.compiler = new Packr({ ...config });
getAllHandler.setSerializer(fromHandler);
getAllHandler.setDeserializer(toHandler);

const getOneHandler = new BasePreare({});
// getAllHandler.compiler = new Packr({ ...config });
getOneHandler.setSerializer(fromHandler);
getOneHandler.setDeserializer(toHandler);

const healthHandler = new BasePreare({});
// getAllHandler.compiler = new Packr({ ...config });
healthHandler.setSerializer(fromHandler);
healthHandler.setDeserializer(toHandler);

export { getAllHandler, getOneHandler, healthHandler };
