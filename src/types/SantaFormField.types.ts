import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IMessageState } from "./SantaForm.types";

export type FieldKey = "id" | "message";

export type ValidationRules =
  | "required"
  | "min"
  | "max"
  | "maxLength"
  | "minLength"
  | "validate"
  | "value"
  | "setValueAs"
  | "shouldUnregister"
  | "onChange"
  | "onBlur"
  | "disabled"
  | "deps"
  | "pattern"
  | "valueAsNumber"
  | "valueAsDate";

export interface ISantaFormField {
  label: string;
  errorMessages: Partial<Record<ValidationRules, string>>;
  placeholder: string;
  type: "as" | "text";
}

export interface ISantaFormProps {
  id: ISantaFormField;
  message: ISantaFormField;
}

export interface ISantaFormFieldProps {
  keyId: FieldKey;
  register: UseFormRegister<IMessageState>;
  errors: FieldErrors<IMessageState>;
  required: boolean;
}

export interface ISantaPendingRequest {
  username: string;
  address: string;
  message: string;
}
