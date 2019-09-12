//dependencies
const path                    = require("path");
const HtmlWebpackPlugin       = require('html-webpack-plugin');

//folders
const src    = path.resolve(__dirname, "src");
const dist   = path.resolve(__dirname, "dist");

function buildConfig(env, args){

	const { mode } = args;

	//build any additional options...
	let modeOptions;
	switch(mode){

		//...for production...
		case "production":
			modeOptions = {
				plugins: [
					new HtmlWebpackPlugin({
						template: `${src}/index.html`,
						minify: {
							removeComments: true,
							collapseWhitespace: true
						}
					})
				]
			}
			break;

		//...for development...
		case "development":
		default:
			modeOptions = {
				mode: "development",
				devtool: 'inline-source-map',
				plugins: [
					new HtmlWebpackPlugin({
						template: `${src}/index.html`
					})
				],
				devServer: {
					contentBase: "./dist",
					https: false,
					historyApiFallback: true
				}
			};
			break;
	}


	//build the composite config file
	return {

		//required config options
		//------------------------------
		entry: `${src}/index.js`,
		output: {
			filename: "bundle.js",
			path: dist,
			publicPath: "/"
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
								modules: {
									localIdentName: "[folder]__[local]",
								},
								url: false
							}
						}
					]	
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: "style-loader",
							options: {
								injectType: "singletonStyleTag"
							}
						},
						{
							loader: "css-loader",
							options: {
								modules: {
									localIdentName: "[folder]__[local]",
								},
								url: false
							}
						}, {
							loader: "sass-loader"
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
				COMPONENTS: `${src}/components`,
				SHARED: `${src}/shared`
			}
		},

		//optional config options
		//-------------------------------
		...modeOptions
	}	
}//buildConfig


//configuration
module.exports = buildConfig;