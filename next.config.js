module.exports = {
	async rewrites() {
		return [
			{
				source: "/inbox",
				destination: "/inbox/none",
			},
			{
				source: "/:first",
				destination: "/:first/none",
			},
		];
	},
};
