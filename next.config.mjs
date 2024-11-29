/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.md$/,
			use: "raw-loader",
		});
		config.resolve.fallback = {
			...config.resolve.fallback,
			async_hooks: require.resolve("async_hooks"),
		};
		return config;
	},
};

export default nextConfig;
