import { Writable, WritableOptions } from "stream";
import fs from "fs";
export default class WritableStream extends Writable {
  constructor(public options: WritableOptions) {
    super({ ...options, objectMode: true });
  }

  override _write(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error | null | undefined) => void
  ): void {
    fs.writeFile(chunk.path, chunk.content, { encoding }, (err) => {
      callback();
    });
  }
}
