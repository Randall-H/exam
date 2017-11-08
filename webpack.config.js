/**
 *
 * @purpose    => This environment setup is responsible for compiling sass,
 *                js, html, images, and fonts into a production-ready bundle in the 'public/' and 'src/' directories.
 * @references => package.json lists out the webpack scripts to run under 'scripts' object
 *
 **/

var path = require('path'),
	WebpackPlugin = require('html-webpack-plugin'),
	ModernizrWebpackPlugin = require('modernizr-webpack-plugin'),
	webpackPlugin,
	config;
//  Webpack = require('webpack')


// if the server environment is set to be production
// ex, running "npm run prod"
if (process.env.NODE_ENV === 'production') {

	// compile the prodapp.html template (prod server environment)
	webpackPlugin = new WebpackPlugin({
		template: 'app/view/prodapp.html',
		filename: 'index.html'
	});

	config = {
		entry: './app/view/js/init.js',
		output: {
			path: path.resolve(__dirname, 'src/public'),
			filename: 'app_bundle.js',
			publicPath : '/'
		},
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /node_modules/,
					loader: ['babel-loader']
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					loader: [ 'style-loader', 'css-loader', 'sass-loader']
				},
				{
					test: /\.(eot|ttf|woff|woff2|svg)$/,
					include: [path.resolve(__dirname, "app/view/css/fonts")],
					loader: ['url-loader?limit=30000&name=assets/font/[hash].[ext]']
				},
				{ test: /\.json$/, loader: 'json-loader' }
			]
		},
		devServer: {
			historyApiFallback: true
		},
		plugins: [
			webpackPlugin,
			new ModernizrWebpackPlugin({
				'htmlWebpackPlugin': webpackPlugin
			})
		]
	};

} else {

	// compile the app.html template (local environment)
	webpackPlugin = new WebpackPlugin({
		template: 'app/view/app.html',
		filename: 'index.html'
	});

	config = {
		entry: './app/view/js/init.js',
		output: {
			path: path.resolve(__dirname, 'public'),
			filename: 'app_bundle.js',
			publicPath : '/'
		},
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /node_modules/,
					loader: ['babel-loader']
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					loader: [ 'style-loader', 'css-loader', 'sass-loader']
				},
				{
					test: /\.(eot|ttf|woff|woff2|svg)$/,
					include: [path.resolve(__dirname, "app/view/css/fonts")],
					loader: ['url-loader?limit=30000&name=assets/font/[hash].[ext]']
				},
				{ test: /\.json$/, loader: 'json-loader' }
			]
		},
		devServer: {
			historyApiFallback: true
		},
		plugins: [
			webpackPlugin,
			new ModernizrWebpackPlugin({
				'htmlWebpackPlugin': webpackPlugin
			})
		]
	};

}

module.exports = config;