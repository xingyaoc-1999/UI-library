


export const fileJudgement = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      resolve(judgeType(reader.result));
    };
  });
};

const judgeType = (buffer: FileReader["result"]) => {
  const keys = Object.keys(type);

  let result = "";
  keys.forEach((v) => (result = type[v](buffer)));
  return result;
};

const type: { [index: string]: Function } = {
  png(buffer: ArrayBuffer) {
    const uint8Arr = new Uint8Array(buffer);
    const pngHex = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    if (pngHex.every((v, i) => v === uint8Arr[i])) {
      return "png";
    }
  },
};
