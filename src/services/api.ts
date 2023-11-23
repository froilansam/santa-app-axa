import { IMessageState } from "../types/SantaForm.types";

/**
 * Sends a message to Santa.
 * @param {IMessageState} param - The message details.
 * @param {string} param.id - The ID of the message.
 * @param {string} param.message - The content of the message.
 * @returns {Promise<Response>} - The response from the server.
 */
export const postSendMessage = async ({ id, message }: IMessageState) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, message }),
  };

  const response = await fetch("http://localhost:3000/santa", requestOptions);

  return response;
};
