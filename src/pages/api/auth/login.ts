import { compare } from "bcrypt";
import * as jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "src/db/prisma";
import * as yup from "yup";

const bodySchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .min(8)
      .max(40)
      // eslint-disable-next-line no-control-regex -- Matches any ASCII character
      .matches(/^[\x00-\x7F]*$/),
  })
  .strict()
  .noUnknown();

export type RefreshTokenPayload = {
  id: string;
  userId: string;
};

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  let validatedBody: yup.Asserts<typeof bodySchema>;

  try {
    validatedBody = await bodySchema.validate(req.body);
  } catch (e) {
    const validationError = e as yup.ValidationError;
    return res.status(400).json({ errors: validationError.errors });
  }

  const user = await prisma.user.findUnique({
    where: { email: validatedBody.email },
  });

  if (!user) return res.status(400).json("Unknown email address.");

  const correctPassword = await compare(
    validatedBody.password,
    user.passwordHash
  );

  if (!correctPassword) {
    res.status(400).json("Wrong password.");
  } else {
    if (!process.env.ACCESS_TOKEN_SECRET)
      throw Error("Missing access token secret.");
    if (!process.env.REFRESH_TOKEN_SECRET)
      throw Error("Missing refresh token secret.");

    const tokenEntry = await prisma.refreshToken.create({
      data: { userId: user.id },
    });

    const refreshTokenPayload: RefreshTokenPayload = {
      id: tokenEntry.id,
      userId: tokenEntry.userId,
    };

    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET
    );

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

    res.status(200).json({ refreshToken, accessToken });
  }
}
