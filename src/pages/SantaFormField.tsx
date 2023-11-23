/**
 * A form field component for the Santa app.
 *
 * @component
 * @example
 * ```tsx
 * <SantaFormField
 *   keyId="firstName"
 *   register={register}
 *   errors={errors}
 *   required={true}
 * />
 * ```
 *
 * @param {ISantaFormFieldProps} props - The props for the SantaFormField component.
 * @param {string} props.keyId - The unique identifier for the form field.
 * @param {Function} props.register - The register function from react-hook-form.
 * @param {Object} props.errors - The errors object from react-hook-form.
 * @param {boolean} props.required - Indicates if the form field is required.
 * @returns {JSX.Element} The rendered SantaFormField component.
 */

import React from "react";
import {
  ISantaFormFieldProps,
  ValidationRules,
} from "../types/SantaFormField.types";
import { santaFormProps } from "../constants/messages";
import Form from "react-bootstrap/Form";

const SantaFormField: React.FC<ISantaFormFieldProps> = ({
  keyId,
  register,
  errors,
  required,
}) => {
  console.log("key", required);
  const {
    label,
    errorMessages: fieldErrorMessages,
    placeholder,
    type,
  } = santaFormProps[keyId];
  const errorType = (errors[keyId] ?? {}).type as ValidationRules;

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        placeholder={placeholder}
        {...(type === "as" ? { as: "textarea" } : { type: "text" })}
        {...register(keyId, {
          required,
          ...(type === "as" && { maxLength: 100 }),
        })}
        isInvalid={!!errors[keyId]}
      />
      {!!errors[keyId] && (
        <Form.Control.Feedback type="invalid">
          {fieldErrorMessages[errorType]}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default SantaFormField;
