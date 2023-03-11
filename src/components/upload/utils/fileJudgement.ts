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
  keys.forEach((v) => {
    result = type[v](buffer) ?? result;
  });
  return result;
};

const type: { [index: string]: Function } = {
  mp4(buffer: ArrayBuffer) {
    const uint8Arr = new Uint8Array(buffer.slice(0, 4));

    const mp4Hex1 = new Uint8Array([0x00, 0x00, 0x00, 0x18]);
    const mp4Hex2 = new Uint8Array([0x00, 0x00, 0x00, 0x1c]);
    if (
      mp4Hex1.every((v, i) => v === uint8Arr[i]) ||
      mp4Hex2.every((v, i) => v === uint8Arr[i])
    ) {
      return "mp4";
    }
    return;
  },
  png(buffer: ArrayBuffer) {
    const uint8Arr = new Uint8Array(buffer);
    const pngHex = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    if (pngHex.every((v, i) => v === uint8Arr[i])) {
      return "png";
    }
    return;
  },
};
