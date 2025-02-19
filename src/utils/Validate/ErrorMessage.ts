import { TxFn, TxKeyPath } from "i18n";

type ErrorMessageOptions = {
  length?: number;
  value?: number | string;
  keepRawMessage?: boolean;
};

type ErrorType =
  | "required"
  | "incorrect"
  | "maxLength"
  | "minLength"
  | "minValue"
  | "maxValue"
  | "greaterThan"
  | "compare"
  | "invalid";

type GetErrorMessageParams = {
  inputName?: TxKeyPath;
  type?: ErrorType;
  options?: ErrorMessageOptions;
};

const getErrorMessage =
  ({ type, options, inputName }: GetErrorMessageParams) =>
  (t: TxFn) => {
    const translatedInputName = inputName !== undefined ? t(inputName) : "";

    switch (type) {
      case "required":
        return t("errorMessage.input.required", {
          input: options?.keepRawMessage
            ? translatedInputName
            : translatedInputName,
        });
      case "incorrect":
      case "incorrect":
        return t("errorMessage.input.incorrect");
      case "invalid":
        return t("errorMessage.input.invalid", {
          input: options?.keepRawMessage
            ? translatedInputName
            : translatedInputName,
        });
      case "maxLength":
        return (
          translatedInputName +
          t("errorMessage.maxLength", { length: options?.length?.toString() })
        );
      case "minLength":
        return (
          translatedInputName +
          t("errorMessage.minLength", { length: options?.length?.toString() })
        );
      case "minValue":
        return (
          translatedInputName +
          t("errorMessage.>=", {
            value: options?.value?.toString(),
          })
        );
      case "maxValue":
        return (
          translatedInputName +
          t("errorMessage.<=", {
            value: options?.value?.toString(),
          })
        );
      case "greaterThan":
        return (
          translatedInputName +
          t("errorMessage.>", {
            value: options?.value?.toString(),
          })
        );
      case "compare":
        return t("errorMessage.input.compare", {
          input: options?.keepRawMessage
            ? translatedInputName
            : translatedInputName,
        });
      default:
        return "";
    }
  };

export const getTrErrorMessage = (t: TxFn) => ({
  required: (inputName: TxKeyPath, options?: ErrorMessageOptions) =>
    getErrorMessage({ inputName, type: "required", options })(t),
  incorrect: (inputName?: TxKeyPath) =>
    getErrorMessage({ inputName, type: "incorrect" })(t),
  compare: (inputName: TxKeyPath, options?: ErrorMessageOptions) =>
    getErrorMessage({ inputName, type: "compare", options })(t),
  maxLength: (inputName: TxKeyPath, options: ErrorMessageOptions) =>
    getErrorMessage({ inputName, type: "maxLength", options })(t),
  minLength: (inputName: TxKeyPath, options: ErrorMessageOptions) =>
    getErrorMessage({ inputName, type: "minLength", options })(t),
  minValue: (inputName: TxKeyPath, options: ErrorMessageOptions) =>
    getErrorMessage({ inputName, type: "minValue", options })(t),
  maxValue: (inputName: TxKeyPath, options: ErrorMessageOptions) =>
    getErrorMessage({ inputName, type: "maxValue", options })(t),
  greaterThan: (inputName: TxKeyPath, options: ErrorMessageOptions) =>
    getErrorMessage({ inputName, type: "greaterThan", options })(t),
  invalid: (inputName: TxKeyPath, options?: ErrorMessageOptions) =>
    getErrorMessage({ inputName, type: "invalid", options })(t),
});

export type TranslatedErrorMessage = ReturnType<typeof getTrErrorMessage>;
