import { memo } from "react";
import { UploadFile } from "../upload/dtos";

import RegularList from "../../utils/RegularList";
import Item from "./Item";
import { fileJudgement } from "../upload/utils/fileJudgement";
import React from "react";
interface FileListProps {
  items: UploadFile[];

  onRemove: (file: UploadFile) => void;
}

const FileList: React.FC<FileListProps> = ({ items, onRemove }) => {
  const typesArrays: string[] = [];

  items.forEach(async (v) => typesArrays.push(await fileJudgement(v.rawFile!)));

  // console.log(a);

  return (
    <>
      <div className="fileList-FileList__layout grid-col-2 grid-row-2 flex flex-col justify-start">
        <RegularList
          keyExtractor={(item: UploadFile) => item.uid}
          data={items}
          renderItem={({ item }) => {
            return (
              <Item
                className="fileList-Item__layout "
                contentClassName="flex fileList-Item__content justify-evenly items-center"
                item={item}
                onRemove={() => onRemove(item)}
              />
            );
          }}
        />
      </div>
    </>
  );
};

export default memo(FileList);
