import {  AxiosResponse } from "axios";
import { upload } from "./index";

class Upload {
  async getUploadedBytes(uid: string) {
    const res: AxiosResponse<string> = await upload.get("/status", {
      headers: {
        "x-file-id": uid,
      },
    });
    return res;
  }
}

const uploadInstance = new Upload();

export default uploadInstance;
