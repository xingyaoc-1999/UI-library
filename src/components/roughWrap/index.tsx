import { AllHTMLAttributes, createElement, ReactNode } from "react";

interface RoughWrapProps extends AllHTMLAttributes<HTMLElement> {
  children: ReactNode;
  customElement: string;
  className?: string;
  contentClassName?: string;
}

const RoughWrap: React.FC<RoughWrapProps> = ({
  children,
  customElement,
  className,
  contentClassName,

  ...restProps
}) => {
  return createElement(
    customElement,
    { className, ...restProps },
    <>
      <div className={contentClassName}>{children}</div>
    </>
  );
};

export default RoughWrap;
