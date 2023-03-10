export const LinearProgressBar = ({ percent }: Record<"percent", number>) => {
  return (
    <div
      className="timeLine-LinearProgressBar flex  grid-row-2 col-span-2 items-end"
      style={{ "--percent": percent } as React.CSSProperties}
    />
  );
};
