import { Formik, FormikValues } from "formik";
import { ReactNode } from "react";
import * as Yup from "yup";

interface FormProps {
  initialValues: FormikValues;
  children: ReactNode;
  validationSchema: Yup.AnyObjectSchema;
  onSubmit: (parameter: FormikValues) => void | Promise<void>;
}

export const Form: React.FC<FormProps> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props) => {
    
        return <>{children}</>;
      }}
    </Formik>
  );
};
