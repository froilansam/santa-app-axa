/**
 * This file contains the configuration for the Redux store.
 * The store is created using the `configureStore` function from the Redux Toolkit library.
 *
 * Library: Redux Toolkit
 *
 * Advantages of using Redux Toolkit:
 * - Simplifies the Redux setup process by providing a set of opinionated defaults
 * - Reduces boilerplate code by automatically generating action creators and reducer logic
 * - Provides built-in support for immutable state updates with the `immer` library
 * - Offers performance optimizations such as memoization and batched updates
 * - Enables easy integration with Redux DevTools for debugging and time-traveling
 */

import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "../state/message.state";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
