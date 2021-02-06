const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				test: /\.(js|ts)x?$/,
			},
			use: ["@svgr/webpack"],
		});

		return config;
	},
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
