/**
 * This file contains the implementation of the SantaForm component.
 * The SantaForm component is responsible for rendering a form where users can submit a letter to Santa.
 * It uses react-bootstrap components for styling and form handling.
 * The component utilizes react-hook-form for form validation and submission.
 * The form data is sent to the server using the sendMessage action from the message slice of the Redux store.
 * The component also displays success or error messages based on the status of the message sending process.
 */

import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { EStatus, IMessageState } from "../../../types/SantaForm.types";
import { Alert } from "react-bootstrap";
import SantaFormField from "./components/SantaFormField";
import { sendMessage } from "../../state/message";
import { AppDispatch, RootState } from "../../store/store";

const SantaForm = () => {
  // Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMessageState>();

  const dispatch = useDispatch<AppDispatch>();

  // Get status and response message from the Redux store
  const { status, responseMessage } = useSelector(
    (state: RootState) => state.messages
  );

  // Reset the form when the message sending is successful
  useEffect(() => {
    if (status === "success") reset();
  }, [status, reset]);

  // Handle form submission
  const onSubmit = (data: IMessageState) => dispatch(sendMessage(data));

  return (
    <Container className="mt-5 mx-3">
      <h1 className="text-primary">A Letter To Santa</h1>
      <h3 className="text-secondary mb-5">
        Ho! Ho! Ho! What do you want for Christmas?
      </h3>
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        {/* Render form fields */}
        <SantaFormField
          keyId="id"
          register={register}
          errors={errors}
          required
        />
        <SantaFormField
          keyId="message"
          register={register}
          errors={errors}
          required
        />

        {/* Display error or success message */}
        {status === EStatus.failed && (
          <Alert variant="danger" className="mt-3">
            {responseMessage}
          </Alert>
        )}
        {status === EStatus.success && (
          <Alert variant="success" className="mt-3">
            {responseMessage}
          </Alert>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={status === "loading"}
        >
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default SantaForm;
