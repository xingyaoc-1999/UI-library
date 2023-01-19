import React from "react";

interface RegularListProps<T> {
  keyExtractor: (item: T) => React.Key | null | undefined;
  data: Array<T>;
  renderItem: React.FC<{ item: T }>;
}

function RegularList<T>({
  renderItem: RenderItem,
  data,
  keyExtractor,
}: RegularListProps<T>) {
  return (
    <>
      {data.map((item) => {
        return (
          <RenderItem
            item={item}
            key={keyExtractor(item)}
          />
        );
      })}
    </>
  );
}

export default RegularList;
