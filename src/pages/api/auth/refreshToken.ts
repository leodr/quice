import * as jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "src/db/prisma";
import * as yup from "yup";
import { RefreshTokenPayload } from "./login";

const bodySchema = yup
  .object({
    refreshToken: yup.string().required(),
  })
  .strict()
  .noUnknown();

export default async function refreshToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  let validatedBody: yup.Asserts<typeof bodySchema>;

  try {
    validatedBody = await bodySchema.validate(req.body);
  } catch (e) {
    const validationError = e as yup.ValidationError;
    return res.status(400).json({ errors: validationError.errors });
  }

  const { refreshToken } = validatedBody;

  if (!process.env.REFRESH_TOKEN_SECRET)
    throw Error("Missing refresh token secret.");

  let payload: RefreshTokenPayload;

  try {
    payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    ) as RefreshTokenPayload;
  } catch {
    return res.status(400).json("Invalid refresh token.");
  }

  const refreshTokenEntry = await prisma.refreshToken.findUnique({
    where: { id: payload.id },
    include: { user: true },
  });

  if (!refreshTokenEntry) return res.status(400).json("Invalid refresh token.");

  const { user } = refreshTokenEntry;

  if (!process.env.ACCESS_TOKEN_SECRET)
    throw Error("Missing access token secret.");

  const accessToken = jwt.sign(
    {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  res.status(201).json({ accessToken });
}
