export const webWoker = () => {
  const worker = new Worker("./worker.ts");
  console.log(worker);
  worker.postMessage([10, 24]);
  worker.onmessage = (e) => {
    console.log(e);
  };
};
