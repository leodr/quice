export interface TokenPayload {
	/**
	 * The form id of the token.
	 */
	fid: string;

	/**
	 * The UTC time in ms at which the token was issued.
	 */
	iat: number;
}
