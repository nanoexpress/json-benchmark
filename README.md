# json-(de)serialize

<p align='center'><b>Benchmarking serialization and deserialization for your API requests to understand which method gives better performance</b></p>

## Requires

- Node.js v15.10+
- `npm`/`yarn`/`bun` installed

## How to use

```bash
bun install
bun run benchmark
```

## Used libraries for benchmarking

- [Protobuf.js](https://github.com/protobufjs/protobuf.js/)
- [msgpackr](https://github.com/kriszyp/msgpackr)
- [@msgpack/msgpack](https://github.com/msgpack/msgpack-javascript)
- [avsc](https://github.com/mtth/avsc)
- [js-binary](https://github.com/sitegui/js-binary)
- [bser](https://facebook.github.io/watchman/docs/bser.html)
- [BSON](https://github.com/mongodb/js-bson)
- [fast-json-stringify](https://github.com/fastify/fast-json-stringify) \[Serialization only\]

## Results

To prevent Your-machine-may-vary use-case, run results on your machine.

## License

MIT
