import request from "supertest";
import express from "express";
import router from "../src/server/routes/santa.route";
import { addRequest, sendEmail } from "../src/server/services/email.service";
import nodemailer from "nodemailer";
import { isDateLessThan10YearsOld } from "../src/server/utils/helpers";

const app = express();
app.use(express.json());
app.use(router);

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

describe("POST /santa", () => {
  it("returns 400 if user is not found or is not a child", async () => {
    const res = await request(app).post("/santa").send({
      id: "nonexistentuser",
      message: "Hello Santa!",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("code");
    expect(res.body).toHaveProperty("message");
  });

  it("returns 400 if user is found but is a child  more than 10 years old", async () => {
    const res = await request(app).post("/santa").send({
      id: "james.bond",
      message: "Hello Santa!",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("code");
    expect(res.body?.code).toBe("3");
    expect(res.body).toHaveProperty("message");
  });

  it("returns 200 if user is found and is a child less than 10 years old", async () => {
    const res = await request(app).post("/santa").send({
      id: "charlie.brown",
      message: "Hello Santa!",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("code");
    expect(res.body?.code).toBe("1");
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("message");
  });
});

describe("Santa email service", () => {
  it("adds a request and sends an email", async () => {
    const request = {
      username: "testuser",
      address: "123 Test St",
      message: "Hello Santa!",
    };

    addRequest(request);

    await sendEmail();

    const sendMailMock = (nodemailer.createTransport as jest.Mock).mock
      .results[0].value.sendMail as jest.Mock;

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock.mock.calls[0][0].text).toContain(request.username);
    expect(sendMailMock.mock.calls[0][0].text).toContain(request.address);
    expect(sendMailMock.mock.calls[0][0].text).toContain(
      JSON.stringify(request.message)
    );
  });
});

describe("isDateLessThan10YearsOld", () => {
  it("returns true for a date less than 10 years old", () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 9);
    expect(isDateLessThan10YearsOld(date.toISOString())).toBe(true);
  });

  it("returns false for a date more than 10 years old", () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 11);
    expect(isDateLessThan10YearsOld(date.toISOString())).toBe(false);
  });
});
