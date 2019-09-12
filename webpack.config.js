//dependencies
const path                    = require("path");
const HtmlWebpackPlugin       = require('html-webpack-plugin');

//folders
const src    = path.resolve(__dirname, "src");
const dist   = path.resolve(__dirname, "dist");

function buildConfig(env, args){

	const { mode } = args;
	const production = {
		output: {
			filename: "bundle.js",
			path: dist,
			publicPath: "./"
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: `${src}/index.html`,
				minify: {
					removeComments: true,
					collapseWhitespace: true
				}
			})
		]
	};
	const development = {
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
		},
		output: {
			filename: "bundle.js",
			path: dist,
			publicPath: "/"
		},
	};
	const styleLoader = {
		loader: "style-loader",
		options: {
			injectType: "singletonStyleTag"
		}	
	};
	const cssLoader = {
		loader: "css-loader",
		options: {
			modules: {
				localIdentName: "[folder]__[local]",
			},
			url: false
		}
	};


	//build any additional options...
	let modeOptions;
	switch(mode){

		//...for production...
		case "production":
			modeOptions = production;
			break;

		//...for development...
		case "development":
		default:
			modeOptions = development;
			break;
	}


	//build the composite config file
	return {

		//required config options
		//------------------------------
		mode,
		entry: `${src}/index.js`,
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
						{ ...styleLoader },
						{ ...cssLoader }
					]	
				},
				{
					test: /\.scss$/,
					use: [
						{ ...styleLoader },
						{ ...cssLoader }, 
						{
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