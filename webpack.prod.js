const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge( common, {
	mode: "production",
	output: {
		filename: "[name].[contentHash].bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	optimization: {
		minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
		new HtmlWebpackPlugin({ 
			template: "./src/index.html",
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true,
			}
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{from:'./src/assets', to: './assets'} 
		])
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, // 3. extract css into files
					"css-loader", // 2. Turns css into commonjs
					"sass-loader" // 1. Turns sass into css
				]
			},
		]
	}
});
