import RoughWrap from "../roughWrap";

export interface ButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: "standard" | "primary";
  disabled?: boolean;
}

export const Button: React.FC<
  ButtonProps &
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "onClick" | "type" | "disabled"
    >
> = ({ children, type = "primary", className, disabled, ...restProps }) => {
  return (
    <RoughWrap
      disabled={disabled}
      customElement="button"
      className={
        type === "primary"
          ? "Button-button--primary"
          : "Button-button--standard"
      }
      {...restProps}
    >
      {children}
    </RoughWrap>
  );
};
