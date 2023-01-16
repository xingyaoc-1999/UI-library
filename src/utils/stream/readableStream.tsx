import { Readable, ReadableOptions } from "stream";

export default class ReadableStream extends Readable {
  constructor(public options: ReadableOptions, public data: any) {
    super(options);
  }

  override _read() {
    this.push(this.data);
    this.push(null);
  }
}

const r = new ReadableStream({ encoding: "utf-8" }, "I am xingyaoc");

r.on("readable", () => {
  console.log(r.read());
});

r.on("data", (chunk) => {
  console.log(chunk);
});

r.on("end", () => {
  console.log("finish");
});

r.on("error", () => {
  console.log("error");
});
