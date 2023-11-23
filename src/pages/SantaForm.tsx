import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../state/message";
import { AppDispatch, RootState } from "../store/store";
import { EStatus, IMessageState } from "../types/SantaForm.types";
import { Alert } from "react-bootstrap";
import SantaFormField from "./SantaFormField";

const SantaForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMessageState>();
  const dispatch = useDispatch<AppDispatch>();
  const { status, responseMessage } = useSelector(
    (state: RootState) => state.messages
  );

  useEffect(() => {
    if (status === "success") reset();
  }, [status, reset]);

  const onSubmit = (data: IMessageState) => dispatch(sendMessage(data));

  return (
    <Container className="mt-5 mx-3">
      <h1 className="text-primary">A Letter To Santa</h1>
      <h3 className="text-secondary mb-5">
        Ho! Ho! Ho! What do you want for Christmas?
      </h3>
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-5">
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
