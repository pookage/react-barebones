//dependencies
const path                    = require("path");
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

//folders
const src    = path.resolve(__dirname, "src");
const dist   = path.resolve(__dirname, "dist");
const assets = path.resolve(__dirname, "assets");

function buildConfig(env, args){

	console.log(env, args);

	//build any additional options...
	let additionalOptions;
	switch(args.mode){

		//...for production...
		case "production":
			additionalOptions = {
				plugins: [
					new HtmlWebpackPlugin({
						template: `${src}/index.html`,
						minify: {
							removeComments: true,
							collapseWhitespace: true
						}
					}),
					new DynamicCdnWebpackPlugin()
				]
			}
			break;

		//...for development...
		case "development":
		default:
			additionalOptions = {
				mode: "development",
				devtool: 'inline-source-map',
				plugins: [
					new HtmlWebpackPlugin({
						template: `${src}/index.html`
					}),
					new DynamicCdnWebpackPlugin()
				],
				devServer: {
					contentBase: "./dist",
					https: true
				}
			};
			break;
	}


	//build the composite config file
	return {

		//required config options
		//-------------------------------
		// entry: ["@babel/polyfill", `${src}/index.js`], //used for async/await but increases bundle size by 80kb
		entry: `${src}/index.js`,
		output: {
			filename: "bundle.js",
			path: dist
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: [
								"@babel/preset-env",
								"@babel/preset-react"
							],
							plugins: [
								"@babel/plugin-proposal-throw-expressions"
							]
						}
					},
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: "style-loader"		
						}, {
							loader: "css-loader",
							options: {
								modules: true,
								localIdentName: "[name]__[local]"
							}
						}
					]	
				},
				{
					test: /\.(png|svg|jpg)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[path][name].[ext]"
							}
						}
					]
				}
			]
		},
		resolve: {
			alias: {
				Assets: assets,
				Components: `${src}/components`
			}
		},

		//optional config options
		//-------------------------------
		...additionalOptions
	}	
}//buildConfig


//configuration
module.exports = buildConfig;