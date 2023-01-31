import { memo } from "react";
import { UploadFile } from "../upload/dtos";
import { ListType } from "../upload/dtos";
import RegularList from "../../utils/RegularList";
import Item from "./Item";
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
  }

  return <></>;
};

export default memo(FileList);
