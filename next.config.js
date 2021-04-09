const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  future: {
    webpack5: true,
    strictPostcssConfiguration: true,
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
