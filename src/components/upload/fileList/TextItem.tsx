import { memo, useMemo } from "react";
import RoughWrap from "../../roughWrap";
import { UploadFile, UploadStatus } from "../dtos";
import img from "../../../assets/images/image.jpg";

export interface TextItemProps {
  item?: UploadFile;
  className?: string;
  contentClassName?: string;
  onRemove?: () => void;
}

const TextItem: React.FC<TextItemProps> = ({
  item,
  className,
  onRemove,
  contentClassName,
}) => {
  // const { status, name, percent = 0 } = item;
  // const uploading = useMemo(() => status === UploadStatus.UPLOADING, [status]);
  // const uploadFailed = useMemo(() => status === UploadStatus.ERROR, [status]);
  // const uploadSuccess = useMemo(() => status === UploadStatus.DONE, [status]);

  return (
    <RoughWrap
      customElement="div"
      contentClassName={contentClassName}
      className={className}
    >
      <div>
        <img
          style={{ width: "28px", height: "41px" }}
          src={img}
          alt=""
        />
      </div>

      <div className="flex flex-col TextItem-textItem__innerWrap">
        <div className="flex justify-between TextItem-textItem__presentation">
          <div className="TextItem-textItem__name">PDF</div>
          <div
            className="TextItem-textItem__status"
            onClick={onRemove}
          >
            success
          </div>
        </div>
        <div className="TextItem-textItem__proceeding">laoding</div>
      </div>

      {/* {uploading && <Progress percent={percent} />} */}
    </RoughWrap>
  );
};

export default memo(TextItem);
