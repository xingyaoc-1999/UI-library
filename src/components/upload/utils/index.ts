import SparkMD5 from "spark-md5";
import uploadInstance from "../../../https/upload";
import { fileJudgement } from "./fileJudgement";

export const getUploadedBytes = async (uid: string) => {
  const { status, data } = await uploadInstance.getUploadedBytes(uid);
  if (status !== 200) {
    throw new Error("Can't get uploaded bytes");
  }
  return Number(data);
};

export const createChunks = (file: File, startByte: number) => {
  const chunkSize = 1024 * 1024 * 10; //10MB

  const chunks: Array<Blob> = [];

  let start = startByte;

  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size);
    const chunkBlock = file.slice(start, end);
    chunks.push(chunkBlock);
    start = end;
  }
  return chunks;
};

export const changeBuffer = (file: File): Promise<Record<string, string>> => {
  return new Promise(async (resolve, reject) => {
    const suffix = await fileJudgement(file);
    const reader = new FileReader(),
      spark = new SparkMD5.ArrayBuffer();

    reader.readAsArrayBuffer(file);
    reader.onload = (ev) => {
      spark.append(ev.target?.result as ArrayBuffer);
      const HASH = spark.end();

      resolve({ HASH, fileName: `${HASH}.${suffix}` });
    };
    reader.onerror = () => {
      reject(reader.error);
      reader.abort();
    };
  });
};
