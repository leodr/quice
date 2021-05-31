import fetch from "node-fetch";
import { prisma } from "../src/db/prisma";

beforeAll(async () => {
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

test("should provide proper authentication and refresh tokens", async () => {
  const registerResponseBody = await fetch(
    "http://localhost:3000/api/auth/register",
    {
      method: "POST",
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        email: "john-doe@example.com",
        password: "S3cretP4ssword",
      }),
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => response.json());

  expect(registerResponseBody).toHaveProperty("refreshToken");
  expect(registerResponseBody).toHaveProperty("accessToken");

  const loginResponseBody = await fetch(
    "http://localhost:3000/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        email: "john-doe@example.com",
        password: "S3cretP4ssword",
      }),
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => response.json());

  expect(loginResponseBody).toHaveProperty("refreshToken");
  expect(loginResponseBody).toHaveProperty("accessToken");

  const refreshTokenResponseBody = await fetch(
    "http://localhost:3000/api/auth/refreshToken",
    {
      method: "POST",
      body: JSON.stringify({
        refreshToken: loginResponseBody.refreshToken,
      }),
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => response.json());

  expect(refreshTokenResponseBody).toHaveProperty("accessToken");
});
