import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "api/app.module";
import express from "express";
import type { NextApiRequest, NextApiResponse } from "next";

const server = express();

const appPromise = NestFactory.create(
	AppModule,
	new ExpressAdapter(server)
).then((app) => {
	app.enableCors();
	app.setGlobalPrefix("/api");
	return app.init();
});

export default async function nestHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await appPromise;

	server(req, res);
}

export const config = {
	api: { externalResolver: true },
};
