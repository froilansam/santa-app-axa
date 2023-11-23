"use strict";
/*
  File: index.ts
  Description: This file is the entry point of the Santa App AXA server.
  It sets up the Express server, middleware, routes, and starts the server.
  It also periodically sends emails using the sendEmail function.

  Author: Froilan Sam Malibiran
  Date: November 23, 2023
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const santa_1 = __importDefault(require("./src/server/routes/santa"));
const email_1 = require("./src/server/services/email");
const path_1 = __importDefault(require("path"));
require("dotenv").config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use((0, morgan_1.default)("dev"));
app.use(santa_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname)));
const listener = app.listen(process.env.PORT || 3000, () => {
    setInterval(email_1.sendEmail, 15000);
    const address = listener === null || listener === void 0 ? void 0 : listener.address();
    console.log(`Your app is listening on port ${address.port}`);
});
exports.default = app;
