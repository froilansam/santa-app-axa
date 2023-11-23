/**
 * This file defines a Redux slice named messages for managing state related to sending messages.
 * It includes the necessary actions, reducers, and an async thunk for handling asynchronous API calls.
 * The state managed by this slice includes message details, status indicators, and response messages.
 */

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postSendMessage } from "../services/api";
import { messagesLookUp } from "../constants/messages";
import {
  EStatus,
  IMessageState,
  ISendMessageAction,
} from "../../types/SantaForm.types";

const initialState: IMessageState = {
  id: "",
  message: "",
  status: EStatus.idle,
  responseMessage: "",
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = EStatus.loading;
      })
      .addCase(
        sendMessage.fulfilled,
        (state, action: PayloadAction<ISendMessageAction>) => {
          state.status = EStatus.success;
          state.id = "";
          state.message = "";
          state.responseMessage = messagesLookUp.find(
            (message) => message.code === action.payload.code
          )?.message;
        }
      )
      .addCase(sendMessage.rejected, (state, action) => {
        state.responseMessage = messagesLookUp.find(
          (message) => message.code === action.error.message
        )?.message;
        state.status = EStatus.failed;
      });
  },
});

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ id, message }: IMessageState) => {
    try {
      const response = await postSendMessage({ id, message });

      const data: ISendMessageAction = await response.json();

      if (!response.ok) throw new Error(data.code.toString());

      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export default messagesSlice.reducer;
