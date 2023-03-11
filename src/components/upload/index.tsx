import FileList from "../fileList";
import { UploadFile, UploadStatus } from "./dtos";

import { ChangeEvent, useRef, useState } from "react";

import axios, { AxiosProgressEvent } from "axios";
import { Button } from "../button";

import { createChunks, getUploadedBytes } from "./utils";
import { fileJudgement } from "./utils/fileJudgement";

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

  const onRemove = (file: UploadFile) => {
    const removedFileList = internalFileList.filter(
      (item) => item.uid !== file.uid
    );
    file.cancelTokenSource.cancel("File is deleted");

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
    uploadFiles && upload(uploadFiles);
    e.target.value = "";
  };
  const generateFiles = async (files: File[]) => {
    const count = files.length + internalFileList.length;
    if (count > maxCount) {
      return;
    }

    const currentFiles = await Promise.all(
      files.map(async (v) => {
        const suffix = await fileJudgement(v);
        console.log(suffix);
        return {
          status: UploadStatus.UPLOADING,
          uid: `${crypto.randomUUID()}.${suffix}`,
          name: v.name,
          rawFile: v,
          cancelTokenSource: axios.CancelToken.source(),
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
    const {
      uid,
      rawFile,
      cancelTokenSource: { token: cancelToken },
    } = currentTask;

    const startByte = await getUploadedBytes(uid);

    const chunks = createChunks(rawFile, startByte);

    async function* dataStream<T>(chunks: Array<T>) {
      for (let index = 0; index < chunks.length; index++) {
        const result = await axios.post(url, chunks[index], {
          cancelToken,
          onUploadProgress: (e: AxiosProgressEvent) => {
            updateStatus(currentTask, {
              status: UploadStatus.UPLOADING,
              percent: Math.round(((e.loaded + startByte) * 100) / e.total!),
            });
          },
          headers: {
            "x-file-id": uid,
            "x-start-byte": startByte,
            "x-file-size": rawFile.size,
          },
        });
        yield result;
      }
    }

    for await (const iterator of dataStream(chunks)) {
      console.log(iterator);
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
      <Button type="primary" onClick={onOpenResource}>
        Browser Files
      </Button>

      {/* <FileList onRemove={onRemove} items={internalFileList} /> */}
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
