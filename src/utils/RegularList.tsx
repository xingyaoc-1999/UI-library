import React from "react";

interface RegularListProps<T, P> {
  keyExtractor: (item: T) => React.Key | null | undefined;
  data: Array<T>;
  renderItem: React.FC<P>;
}

function RegularList<T, P>({
  renderItem: RenderItem,
  data,
  keyExtractor,
}: RegularListProps<T, P extends any ? any : any>) {
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
