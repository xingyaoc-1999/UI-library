import FileList from "../fileList";
import { ResponseData, UploadFile, UploadStatus } from "./dtos";

import { ChangeEvent, useMemo, useRef, useState } from "react";

import axios, { AxiosProgressEvent } from "axios";
import { Button } from "../button";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

export interface UploadProps {
  url: string;
  accept?: string;
  multiple?: boolean;

  className?: string;
  fileList?: UploadFile[];
  maxCount?: number;

  beforeUpload?: (fileList: File[]) => Promise<File[]>;
  customRequest?: (formData: FormData) => Promise<ResponseData>;
}

export const Upload: React.FC<UploadProps> = ({
  url,
  accept,
  multiple,

  beforeUpload,
  maxCount = 6,

  customRequest,
  fileList = [],
}) => {
  const [internalFileList, setInternalFileList] = useState(fileList);
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const [over, setOver] = useState(false);
  useMemo(() => {
    fileList.forEach((file) => {
      if (!file.uid) file.uid = crypto.randomUUID();
      if (!file.status) file.status = UploadStatus.DONE;
    });
  }, [fileList]);

  const onRemove = (file: UploadFile) => {
    const removedFileList = internalFileList.filter(
      (item) => item.uid !== file.uid
    );

    setInternalFileList(removedFileList);
  };

  const onOpenResource = (e: Pick<Event, "stopPropagation">) => {
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onInternalChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { files: rawFiles } = e.target;

    if (!rawFiles) return;
    let files = Array.from(rawFiles);
    console.log(files);

    async function* generateFiles() {
      if (beforeUpload) {
        const shouldUpload = await beforeUpload(files);
        files = shouldUpload;
      }

      const currentFiles = files.map((v) => ({
        status:
          v.size < 1 << 10 ? UploadStatus.UPLOADING : UploadStatus.CANCELED,
        uid: crypto.randomUUID(),
        name: v.size < 1 << 10 ? v.name : "File Size is too large",
        rawFile: v,
      }));
      const count = currentFiles.length + internalFileList.length;
      if (count < maxCount) {
        setInternalFileList((preTask) => [...preTask, ...currentFiles]);
        yield* currentFiles;
      }
    }
    const uploadFile: UploadFile[] = [];
    for await (const i of generateFiles()) {
      uploadFile.push(i);
    }

    async function uplaod() {
      await Promise.allSettled(
        uploadFile.map(async (currentTask) => {
          try {
            if (currentTask.status === UploadStatus.CANCELED) {
              return;
            }
            const result = await post(currentTask);

            updateStatus(currentTask, {
              status: UploadStatus.DONE,
              url: result.url,
            });
            console.log(internalFileList);
          } catch (error) {
            updateStatus(currentTask, {
              status: UploadStatus.ERROR,
              url: "",
            });

            throw error;
          }
        })
      ).catch((error) => {
        console.log(error);
      });
    }
    uplaod();
    e.target.value = "";
  };

  const post = async (currentTask: UploadFile): Promise<ResponseData> => {
    const formData = new FormData();
    const { rawFile } = currentTask;
    if (!rawFile) throw new Error("no rawFile");

    if (customRequest) return await customRequest(formData);
    const res = await axios.post(url, formData, {
      onUploadProgress: (e: AxiosProgressEvent) => {
        updateStatus(currentTask, {
          status: UploadStatus.UPLOADING,
          percent: Math.round((e.loaded * 100) / e.total!),
        });
      },
    });
    return res.data;
  };

  const updateStatus = (
    currentTask: UploadFile,
    info: { status?: string; url?: string; percent?: number }
  ) => {
    setInternalFileList((pre) => {
      return pre.map((task) => {
        if (task.uid !== currentTask.uid) return task;
        return {
          ...task,
          ...info,
        };
      });
    });
  };

  return (
    <>
      <div className="upload-Upload__quote flex flex-col">
        <div className="upload-Upload__title">Upload Files</div>
        <div className="upload-Upload__description">
          Upload documents you want to share with your team
        </div>
      </div>
      <div className="flex justify-center items-center grid-row-2 upload-Upload__operation-container place-self-center flex-row">
        <div className="flex  upload-Upload__operation flex-col justify-between items-center">
          <div
            ref={uploadRef}
            className={over ? "upload-Upload__over" : null!}
            onDragEnter={() => setOver(true)}
            onDragLeave={() => setOver(false)}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={async (e) => {
              e.preventDefault();
              // await handleUploadTasks(Array.from(e.dataTransfer.files));
            }}>
            <IconContext.Provider
              value={{ className: "upload-Upload__iconFont" }}>
              <AiOutlineCloudUpload />
            </IconContext.Provider>
          </div>

          <div className="upload-Upload__operation__description">
            Drag and Drop here
          </div>
          <div className="upload-Upload__operation__description">-OR-</div>
          <Button type="primary" onClick={onOpenResource}>
            Browser Files
          </Button>
        </div>
      </div>
      <div className="upload-Upload__subtitle grid-col-2 grid-row-2">
        Upload Files
      </div>

      <FileList onRemove={onRemove} items={internalFileList} />

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onInternalChange}
        multiple={multiple}
        hidden
      />
    </>
  );
};
