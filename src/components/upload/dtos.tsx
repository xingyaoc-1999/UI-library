export const enum UploadStatus {
  UPLOADING = "uploading",
  DONE = "done",
  ERROR = "error",
  REMOVED = "removed",
  CANCELED = "canceled",
}

export interface UploadFile {
  name?: string;
  uid?: string;
  status?: string;
  url?: string;
  percent?: number;
  rawFile?: File;
}

export interface ResponseData {
  url: string;
  [key: string]: any;
}
