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

export const registerSchema = yup
  .object()
  .shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Provide valid email address")
      .required("Email address is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm Password is required"),
  })
  .required();

export const userSchema = yup
  .object()
  .shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Provide valid email address")
      .required("Email address is required"),
  })
  .required();
