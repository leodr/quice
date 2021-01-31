import { Dependencies, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "api/token/token-payload.interface";
import jwt from "jsonwebtoken";

@Injectable()
@Dependencies(ConfigService)
export class TokenService {
	constructor(private configService: ConfigService) {}

	signToken(payload: TokenPayload) {
		const jwtSecret = this.configService.get<string>("JWT_SECRET");

		if (!jwtSecret) {
			throw Error("The JWT secret environment variable could not be found.");
		}

		return new Promise<string>((resolve, reject) => {
			jwt.sign(payload, jwtSecret, (err, token) => {
				if (err || !token) {
					reject(err);
				} else {
					resolve(token);
				}
			});
		});
	}

	verifyToken(token: string) {
		const jwtSecret = this.configService.get<string>("JWT_SECRET");

		if (!jwtSecret) {
			throw Error("The JWT secret environment variable could not be found.");
		}

		return new Promise<TokenPayload>((resolve, reject) => {
			jwt.verify(token, jwtSecret, (err, payload) => {
				if (err || !payload) {
					reject(err);
				} else {
					resolve(payload as TokenPayload);
				}
			});
		});
	}
}
