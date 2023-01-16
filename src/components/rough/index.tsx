import React from "react";

export const ReactRough = React.forwardRef(
  ({ width = 300, height = 150, type = "svg", ...restProps }, ref) => {
    return (
      <ReactRoughComponent
        width={width}
        height={height}
        type={type}
        {...restProps}
      />
    );
  }
);
