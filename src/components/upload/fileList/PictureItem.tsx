import { memo } from "react";
import { UploadFile } from "../dtos";

interface PictureItemProps {
  item?: UploadFile;
  className?: string;
  onRemove: () => void;
}

const PictureItem: React.FC<PictureItemProps> = ({
  item,
  className,
  onRemove,
}) => {
  return null;
};

export default memo(PictureItem);
