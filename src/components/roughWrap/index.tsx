import React, { forwardRef } from "react";
import { AllHTMLAttributes, createElement, ReactNode } from "react";

interface RoughWrapProps extends AllHTMLAttributes<HTMLElement> {
  children: ReactNode;
  customElement: string;
  className?: string;
  contentClassName?: string;
}

const RoughWrap = forwardRef<HTMLElement, RoughWrapProps>(
  (
    {
      children,
      customElement,
      className,
      contentClassName,

      ...restProps
    },
    ref
  ) => {
    return createElement(
      customElement,
      { ref, className, ...restProps },
      <>
        <div className={contentClassName}>{children}</div>
      </>
    );
  }
);

export default RoughWrap;
