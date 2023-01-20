import { FormikValues } from "formik";
import { Form } from "../components/form";
import { Input } from "../components/input";
import * as Yup from "yup";

export const SignForm = () => {
  return (
    <Form
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={function (parameter: FormikValues): void | Promise<void> {
      }}
    >
      <Input
        label="First Name"
        name="firstName"
        type="text"
        placeholder="Jane"
      />
    </Form>
  );
};
