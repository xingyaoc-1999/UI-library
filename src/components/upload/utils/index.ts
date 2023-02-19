import SparkMD5 from "spark-md5";
import { Upload } from "..";
import uploadInstance from "../../../https/upload";

import { fileJudgement } from "./fileJudgement";

const changeBuffer = (file: File): Promise<Record<string, string>> => {
  return new Promise(async (resolve, reject) => {
    const suffix = await fileJudgement(file);
    const reader = new FileReader(),
      spark = new SparkMD5.ArrayBuffer();

    reader.readAsArrayBuffer(file);
    reader.onload = (ev) => {
      spark.append(ev.target?.result as ArrayBuffer);
      const HASH = spark.end();

      resolve({ HASH, suffix, fileName: `${HASH}.${suffix}` });
    };
    reader.onerror = () => {
      reject(reader.error);
      reader.abort();
    };
  });
};

export const calcFileMD5 = async (file: File) => {
  let max = 1024 * 100,
    count = Math.ceil(file.size / max),
    index = 0,
    chunks = [];
  if (count > 100) {
    max = file.size / 100;
    count = 100;
  }
  while (index < count) {
    const slice = file.slice(index * max, (index + 1) * max) as File;
    const { HASH, suffix } = await changeBuffer(slice);
    chunks.push({
      file: slice,
      fileName: `${HASH}_${index + 1}.${suffix}`,
    });
    index++;
  }
  return chunks;
};

const getUploadedBytes = async (uid: string) => {
  const { status, data } = await uploadInstance.getUploadedBytes(uid);
  if (status !== 200) {
    throw new Error("Can't get uploaded bytes: ");
  }
  return data;
};

const upload = async (uid: string) => {};
