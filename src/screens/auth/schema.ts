import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Provide valid email address")
      .required("Email address is required"),
    password: yup.string().required("Password is required"),
  })
  .required();
