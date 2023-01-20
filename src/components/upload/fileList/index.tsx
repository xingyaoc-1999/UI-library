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
        <div className="FileList-fileList__layout grid-col-2 grid-row-2 flex flex-col justify-start">
          <RegularList
            keyExtractor={(item: UploadFile) => item.uid}
            data={items}
            renderItem={({ item }) => {
              return (
                <TextItem
                className="TextItem-textItem__layout "
                  contentClassName="grid TextItem-textItem__content"
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
