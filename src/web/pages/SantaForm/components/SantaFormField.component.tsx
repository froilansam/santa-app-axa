/**
 * This file contains the definition of the SantaFormField component.
 * The SantaFormField component is a form field component used in the SantaForm component.
 * It renders a form field with label, placeholder, and validation error messages.
 * The component receives props such as keyId, register, errors, and required.
 * It uses the react-bootstrap Form component for rendering the form field.
 */

import React from "react";
import {
  ISantaFormFieldProps,
  ValidationRules,
} from "../../../../types/SantaFormField.types";
import { santaFormProps } from "../../../constants/messages.constant";
import Form from "react-bootstrap/Form";

/**
 * SantaFormField component renders a form field with label, placeholder, and validation error messages.
 * @param {ISantaFormFieldProps} props - The props for the SantaFormField component.
 * @param {string} props.keyId - The key identifier for the form field.
 * @param {Function} props.register - The register function from react-hook-form for form field registration.
 * @param {Object} props.errors - The errors object from react-hook-form for form field validation errors.
 * @param {boolean} props.required - Indicates if the form field is required.
 * @returns {JSX.Element} The rendered SantaFormField component.
 */
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
