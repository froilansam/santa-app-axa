/**
 * The Redux store configuration.
 */
import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "../state/message";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
