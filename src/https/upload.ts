import { AxiosResponse } from "axios";
import { upload } from "./index";

class Upload {
  async upload(url: string, file: File, startByte: number, uid: string) {
    const response = await upload.post(
      url,
      {
        uid,
        file: file.slice(startByte),
      },
      {
        headers: {
          "content-type": "text/json",
          "x-start-byte": startByte,
        },
      }
    );
    return response.data;
  }

  async getUploadedBytes(uid: string) {
    const res: AxiosResponse<number> = await upload.get("/status", {
      params: { uid },
    });
    return res;
  }
}

const uploadInstance = new Upload();

export default uploadInstance;
