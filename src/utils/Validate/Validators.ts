import * as yup from "yup";
import { inputMaxLength } from "./MaxLength";
import { regexPattern } from "./RegexPattern";
import { getTrErrorMessage } from "./ErrorMessage";
import { TxFn } from "i18n";
// import { differenceInYears, parseISO } from "date-fns";

const emailValidator = (t: TxFn) => {
  const errorMsg = getTrErrorMessage(t);
  return yup
    .string()
    .required(errorMsg.required("input.email.label"))
    .max(
      inputMaxLength.email,
      errorMsg.maxLength("input.email.label", {
        length: inputMaxLength.email,
      })
    )
    .matches(regexPattern.email, errorMsg.incorrect("input.email.label"))
    .nullable();
};

const passwordValidator = (t: TxFn) => {
  const errorMsg = getTrErrorMessage(t);
  return yup
    .string()
    .required(errorMsg.required("input.password.label"))
    .max(
      inputMaxLength.password,
      errorMsg.maxLength("input.password.label", {
        length: inputMaxLength.password,
      })
    )
    .matches(regexPattern.password, errorMsg.incorrect("input.password.label"))
    .nullable();
};

// const firstNameValidator = (t: TFunction<TxKeyPath, undefined>) => {
//   const errorMsg = getTrErrorMessage(t);
//   return yup
//     .string()
//     .required(errorMsg.required("input.firstName.label"))
//     .max(
//       inputMaxLength.firstName,
//       errorMsg.maxLength("input.firstName.label", {
//         length: inputMaxLength.firstName,
//       })
//     )
//     .nullable();
// };

// const lastNameValidator = (t: TFunction<TxKeyPath, undefined>) => {
//   const errorMsg = getTrErrorMessage(t);
//   return yup
//     .string()
//     .required(errorMsg.required("input.lastName.label"))
//     .max(
//       inputMaxLength.lastName,
//       errorMsg.maxLength("input.lastName.label", {
//         length: inputMaxLength.lastName,
//       })
//     )
//     .nullable();
// };

// const dobValidator = (t: TFunction<TxKeyPath, undefined>) => {
//   const errorMsg = getTrErrorMessage(t);
//   return yup
//     .string()
//     .required(errorMsg.required("input.dob.label"))
//     .test("under 18 check", t("errorMessage.input.dob"), (value) => {
//       const age = differenceInYears(new Date(), parseISO(value));
//       return age >= 18;
//     })
//     .nullable();
// };

// const sexValidator = (t: TFunction<TxKeyPath, undefined>) => {
//   const errorMsg = getTrErrorMessage(t);
//   return yup.string().required(errorMsg.required("input.sex.label")).nullable();
// };

export const validators = {
  email: emailValidator,
  password: passwordValidator,
  // firstName: firstNameValidator,
  // lastName: lastNameValidator,
  // dob: dobValidator,
  // sex: sexValidator,
};
