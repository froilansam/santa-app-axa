/*
  File: index.ts
  Description: This file is the entry point of the Santa App AXA server.
  It sets up the Express server, middleware, routes, and starts the server.
  It also periodically sends emails using the sendEmail function.

  Author: Froilan Sam Malibiran
  Date: November 23, 2023
*/

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { json } from "body-parser";
import { AddressInfo } from "net";
import santaRouter from "./src/server/routes/santa";
import { sendEmail } from "./src/server/services/email";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(json());
app.use(morgan("dev"));
app.use(santaRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  setInterval(sendEmail, 15000);

  const address = listener?.address() as AddressInfo;
  console.log(`Your app is listening on port ${address.port}`);
});

export default app;
