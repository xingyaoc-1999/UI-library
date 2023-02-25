import SparkMD5 from "spark-md5";
import uploadInstance from "../../../https/upload";

import { fileJudgement } from "./fileJudgement";

export const changeBuffer =  (
  file: File
): Promise<Record<string, string>> => {
  return  new Promise(async (resolve, reject) => {
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

export const getUploadedBytes = async (uid: string) => {
  const { status, data } = await uploadInstance.getUploadedBytes(uid);
  if (status !== 200) {
    throw new Error("Can't get uploaded bytes");
  }
  return Number(data);
};
