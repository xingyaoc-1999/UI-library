import { forwardRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import RoughWrap from "../roughWrap";

export interface DialogProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  domRef?: Element | DocumentFragment;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      children,
      className,
      contentClassName,
      domRef = document.body.childNodes[3] as Element,
    },
    ref
  ) => {
    return createPortal(
      <RoughWrap
        customElement="dialog"
        ref={ref}
        className={`dialog-Dialog ${className}`}
        contentClassName={contentClassName}>
        {children}
      </RoughWrap>,
      domRef
    );
  }
);
