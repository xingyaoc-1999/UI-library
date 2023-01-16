import axios from "axios";
import { blob } from "stream/consumers";

// // WARNING: DO NOT USE THE CODE IN PRODUCTION, AS IT DOESN'T COVER ALL THE REQUEST AND ERROR CASES
// class ResumableFetc {
//   constructor(input, init) {
//     this.aborter = null;
//     this.request = null;
//     this.length = 0;
//     this.total = null;
//     this.done = false;
//     this.contentType = null;
//     this.chunks = [];
//     // ignore called as `fetch(input: Request)` at this time
//     this.input = input;
//     this.init = init || {};
//   }

//   start() {
//     if (this.done) {
//       return Promise.reject(new Error("The chunks have been piped out"));
//     }
//     if (this.aborter && !this.aborter.signal.aborted) {
//       return this.request;
//     }

//     this.aborter = new AbortController();
//     const { headers = {} } = this.init;
//     const init = {
//       ...this.init,
//       headers: {
//         ...headers,
//         ...(this.length
//           ? {
//               Range: `bytes=${this.length}-`,
//             }
//           : false),
//       },
//       signal: this.aborter.signal,
//     };

//     this.request = fetch(this.input, init)
//       .then((res) => {
//         this.contentType = res.headers.get("content-type");
//         const total = res.headers.get("content-length");
//         if (!this.length) {
//           this.total = total;
//         } else if (total === this.total) {
//           // server may not support range request
//           this.reset();
//         }
//         return res.body.getReader();
//       })
//       .then((reader) => this.readChunks(reader))
//       .then((chunks) => {
//         const stream = new ReadableStream({
//           start(controller) {
//             const push = () => {
//               const chunk = chunks.shift();
//               if (!chunk) {
//                 controller.close();
//                 return;
//               }
//               controller.enqueue(chunk);
//               push();
//             };
//             push();
//           },
//         });

//         return new Response(stream, {
//           headers: {
//             "content-type": this.contentType,
//             "content-length": this.total,
//           },
//         });
//       })
//       .catch((err) => {
//         this.abort();
//         this.aborter = null;
//         throw err;
//       });

//     return this.request;
//   }

//   readChunks(reader) {
//     return reader.read().then(({ value, done }) => {
//       if (done) {
//         this.done = true;
//         return this.chunks;
//       }

//       this.chunks.push(value);
//       this.length += value.length;
//       if (this.onprogress) {
//         this.onprogress({
//           lengthComputable: !!this.total,
//           total: this.total,
//           loaded: this.length,
//         });
//       }
//       return this.readChunks(reader);
//     });
//   }

//   abort() {
//     if (this.aborter) {
//       this.aborter.abort();
//     }
//   }

//   reset() {
//     this.chunks = [];
//     this.length = 0;
//   }
// }

// TODO
class ResumableFetch {
  constructor(private url: string) {}

  async read() {
    const response = await axios.get(this.url);
    return response;
  }

  // start() {
  //   const stream = new ReadableStream({
  //     start: async (controller) => {
  //       const push = () => {
  //         const chunk = chunks.shift();
  //         if (chunk) {
  //           controller.enqueue(chunk);
  //           return;
  //         }
  //         controller.close();
  //         push();
  //       };
  //       push();
  //     },
  //   });
  // }
}

export default ResumableFetch;
