import { memo, useMemo } from "react";
import { IconContext } from "react-icons/lib";
import RoughWrap from "../../roughWrap";
import { UploadFile, UploadStatus } from "../dtos";
import { FileIcon } from "./icon";

export interface TextItemProps {
  item: UploadFile;
  className?: string;
  contentClassName?: string;
  onRemove?: () => void;
}

const TextItem: React.FC<TextItemProps> = ({
  item: { name, status, percent = 0, rawFile },
  className,
  onRemove,
  contentClassName,
}) => {
  // const uploading = useMemo(() => status === UploadStatus.UPLOADING, [status]);
  // const uploadFailed = useMemo(() => status === UploadStatus.ERROR, [status]);
  // const uploadSuccess = useMemo(() => status === UploadStatus.DONE, [status]);

  return (
    <RoughWrap
      customElement="div"
      contentClassName={contentClassName}
      className={className}
    >
      <IconContext.Provider
        value={{
          className: "TextItem-textItem__fileIcon place-self-center",
        }}
      >
        <FileIcon rawFile={rawFile} />
      </IconContext.Provider>

      <div className="flex flex-col TextItem-textItem__info self-center"  >
        <div className="TextItem-textItem__name ">{name}</div>
        <div className="TextItem-textItem__proceeding   ">
          Lorem ipsum, dolor sit amet consecte
        </div>
      </div>
      <div
        className="TextItem-textItem__status self-start"
        onClick={onRemove}
      >
        {status}
      </div>
   

      {/* {uploading && <Progress percent={percent} />} */}
    </RoughWrap>
  );
};

export default memo(TextItem);
