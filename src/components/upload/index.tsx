import FileList from "./fileList";
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
  listType?: "picture" | "text";
  beforeUpload?: (fileList: File[]) => Promise<File[]>;
  customRequest?: (formData: FormData) => Promise<ResponseData>;
  onCountExceed?: (exceed: number) => void;
}

export const Upload: React.FC<UploadProps> = ({
  url,
  accept,
  multiple,
  listType,
  beforeUpload,
  maxCount = 6,
  onCountExceed,
  customRequest,
  fileList = [],
}) => {
  const [internalFileList, setInternalFileList] = useState(fileList);
  const inputRef = useRef<HTMLInputElement>(null);

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
    let files: File[] = Array.from(rawFiles);

    await handleUploadTasks(files);
  };
  const handleUploadTasks = async (files: File[]) => {
    if (beforeUpload) {
      const shouldUpload = await beforeUpload(files);
      files = shouldUpload;
    }

    const newTasks: UploadFile[] = files.map((file, index) => ({
      uid: crypto.randomUUID(),
      status: UploadStatus.UPLOADING,
      name: file.name,
      rawFile: file,
    }));

    if (!isCountExceed(newTasks.length)) {
      setInternalFileList(newTasks);
      await upload(newTasks);
    }
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

  const upload = async (tasks: UploadFile[]) => {
    await Promise.allSettled(
      tasks.map(async (currentTask) => {
        try {
          const result = await post(currentTask);
          updateStatus(currentTask, {
            status: UploadStatus.DONE,
            url: result.url,
          });
        } catch (error) {
          updateStatus(currentTask, { status: UploadStatus.ERROR, url: "" });

          throw error;
        }
      })
    ).catch((error) => {
      console.log(error);
    });
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

  const isCountExceed = (len: number) => {
    const count = len + internalFileList.length;
    if (count <= maxCount) return false;
    if (onCountExceed) onCountExceed(count);
    return true;
  };
  return (
    <>
      <div className="Upload-upload__quote flex flex-col">
        <div className="Upload-upload__title">Upload Files</div>
        <div className="Upload-upload__description">
          Upload documents you want to share with your team
        </div>
      </div>
      <div className="flex justify-center items-center grid-row-2 Upload-upload__operation-container place-self-center flex-row">
        <div className="flex Upload-upload__operation flex-col justify-between items-center">
          <IconContext.Provider
            value={{ className: "Upload-upload__uploadIcon" }}
          >
            <AiOutlineCloudUpload />
          </IconContext.Provider>

          <div className="Upload-upload__operation__description">
            Drag and Drop here
          </div>
          <div className="Upload-upload__operation__description">-OR-</div>
          <Button
            type="primary"
            onClick={onOpenResource}
          >
            Browser Files
          </Button>
        </div>
      </div>
      <div className="Upload-upload__subtitle grid-col-2 grid-row-2">
        Upload Files
      </div>

      <FileList
        onRemove={onRemove}
        items={internalFileList}
        type={listType}
      />

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
