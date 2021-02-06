const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
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
});
