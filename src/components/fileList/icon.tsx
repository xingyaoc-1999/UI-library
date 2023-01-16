import { createElement } from "react";
import { AiOutlineFileWord } from "react-icons/ai";
import { IconType } from "react-icons/lib";
interface FileIconProps {
  rawFile?: File;
}

const iconMap: { [index: string]: IconType } = {
  document: AiOutlineFileWord,
};

export const FileIcon: React.FC<FileIconProps> = ({ rawFile }) => {
  const type = rawFile?.type.slice(rawFile?.type.lastIndexOf(".") + 1)!;

  return createElement(iconMap[type]);
};
