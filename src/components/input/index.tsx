import { FieldHookConfig, useField } from "formik";
import { InputHTMLAttributes } from "react";

import RoughWrap from "../roughWrap";
interface InputProps {
  label: string;
  className?: string;
  contentClassName?: string;
}

export const Input: React.FC<
  FieldHookConfig<InputHTMLAttributes<HTMLInputElement>> & InputProps
> = ({ label, className, contentClassName, ...restProps }) => {
  //   const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(restProps) as any;
  // field onChange onBlur value

  //   console.log(field, meta, helpers);
  return (
    <RoughWrap
      customElement="div"
      className={className}
      contentClassName={contentClassName}
    >
      <label htmlFor={restProps.id || restProps.name}>{label}</label>
      <input
        type="text"
        {...field}
        {...restProps}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </RoughWrap>
  );
};
