const path = require('path');

module.exports = {
	entry: {
		main: "./src/index.js",
		vendor: "./src/vendor.js"
	},
	module: {
		rules: [
			{
				type: 'javascript/auto',
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.(svg|jpg|png|gif|ttf|eot|woff)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: "assets"
					}
				}
			}
		]
	}
};
