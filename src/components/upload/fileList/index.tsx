import { memo } from "react";
import { UploadFile } from "../dtos";
import { ListType } from "../dtos";
import RegularList from "../../../utils/RegularList";
import TextItem from "./TextItem";
interface FileListProps {
  items: UploadFile[];
  type?: "picture" | "text";
  onRemove: (file: UploadFile) => void;
}

const FileList: React.FC<FileListProps> = ({
  items,
  type = "picture",
  onRemove,
}) => {
  if (Object.is(type, ListType.TEXT)) {
    return (
      <>
        <RegularList
          keyExtractor={(item: UploadFile) => item.uid}
          data={items}
          renderItem={({ item }) => {
            return (
              <TextItem
                contentClassName="flex justify-around"
                className=" TextItem-textItem__outerWrap"
                item={item}
                onRemove={() => onRemove(item)}
              />
            );
          }}
        />
      </>
    );
  }

  return <></>;
};

export default memo(FileList);
