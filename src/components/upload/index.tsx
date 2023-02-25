import FileList from "../fileList";
import { UploadFile, UploadStatus } from "./dtos";

import { ChangeEvent, useRef, useState } from "react";

import axios, { AxiosProgressEvent } from "axios";
import { Button } from "../button";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { changeBuffer, getUploadedBytes } from "./utils";

export interface UploadProps {
  url: string;
  accept?: string;
  multiple?: boolean;
  className?: string;

  maxCount?: number;
}

export const Upload: React.FC<UploadProps> = ({
  url,
  accept,
  multiple,
  maxCount = 6,
}) => {
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const [over, setOver] = useState(false);

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
    const uploadFiles = await generateFiles(files);
    upload(uploadFiles!);
    e.target.value = "";
  };
  const generateFiles = async (files: File[]) => {
    const count = files.length + internalFileList.length;
    if (count > maxCount) {
      return;
    }

    const currentFiles = await Promise.all(
      files.map(async (v) => {
        const { HASH, fileName } = await changeBuffer(v);
        return {
          status: UploadStatus.UPLOADING,
          uid: HASH,
          name: fileName,
          rawFile: v,
        };
      })
    );

    setInternalFileList((preTask) => [...preTask, ...currentFiles]);
    return currentFiles;
  };

  const upload = async (uploadFile: UploadFile[]) => {
    await Promise.all(
      uploadFile.map(async (currentTask) => {
        try {
          if (currentTask.status === UploadStatus.CANCELED) {
            return;
          }
          const result = await post(currentTask);
          console.log(result);

          updateStatus(currentTask, {
            status: UploadStatus.DONE,
            url: result.url,
          });
        } catch (error) {
          updateStatus(currentTask, {
            status: UploadStatus.ERROR,
            url: "",
          });

          console.log(error);
        }
      })
    ).catch((error) => {
      console.log(error);
    });
  };

  const post = async (currentTask: UploadFile): Promise<any> => {
    const { rawFile, name } = currentTask;

    const startByte = await getUploadedBytes(name);

    const readableStream = rawFile.slice(startByte).stream();
    const stream = readableStream.getReader();

    while (true) {
      let { done, value } = await stream.read();
      if (done) {
        console.log("all blob processed.");
        break;
      }
      const res = await axios.post(url, value, {
        onUploadProgress: (e: AxiosProgressEvent) => {
          updateStatus(currentTask, {
            status: UploadStatus.UPLOADING,
            percent: Math.round(((e.loaded + startByte) * 100) / e.total!),
          });
        },
        headers: {
          "x-file-id": name,
          "x-start-byte": startByte,
          "x-file-size": rawFile.size,
          "content-type": "application / octet - stream",
        },
      });
      return res.data;
    }
  };

  const updateStatus = (
    currentTask: UploadFile,
    info: { status?: string; url?: string; percent?: number }
  ) => {
    setInternalFileList((pre) => {
      return pre.map((task) => {
        if (task.uid !== currentTask.uid) return task;
        const newTask = { ...task, ...info };
        return newTask;
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
            }}
          >
            <IconContext.Provider
              value={{ className: "upload-Upload__iconFont" }}
            >
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
