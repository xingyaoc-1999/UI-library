import { memo } from "react";
import { IconContext } from "react-icons/lib";

import { LinearProgressBar } from "../timeLine/linearProgressBar";
import { UploadFile, UploadStatus } from "../upload/dtos";
// import { FileIcon } from "./Icon";

export interface TextItemProps {
  item: UploadFile;
  className?: string;
  contentClassName?: string;
  onRemove?: () => void;
}

const Item: React.FC<TextItemProps> = ({
  item: { name, status, percent = 10, rawFile },
  className,
  onRemove,
  contentClassName,
}) => {
  // const uploading = useMemo(() => status === UploadStatus.UPLOADING, [status]);
  // const uploadFailed = useMemo(() => status === UploadStatus.ERROR, [status]);
  // const uploadSuccess = useMemo(() => status === UploadStatus.DONE, [status]);

  return (
    <div className={className}>
      <div className={contentClassName}>
        {/* <IconContext.Provider
          value={{
            className: "fileList-Item__fileIcon place-self-center",
          }}
        >
          <FileIcon rawFile={rawFile} />
        </IconContext.Provider> */}
        <div className="grid fileList-Item__info ">
          <div className="fileList-Item__name  ">{`${name} (${percent}%)`}</div>
          <LinearProgressBar percent={percent} />
          <div
            className="fileList-Item__status grid-col-2 justify-self-end "
            onClick={onRemove}
          >
            {status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
