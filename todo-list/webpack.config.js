var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});



module.exports = { 
  entry: {
    javascript: './app/js/app.js',
  },  

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },  

  module: {
    rules: [

      {   
         test: /\.jsx?$/,
	     exclude: /node_modules/,
	     loaders: ["react-hot-loader", "babel-loader"],
      },

      {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader", options: {
                       sourceMap: true
                	}
                 }, 
                 {
                    loader: "sass-loader", options: {
	                    sourceMap: true
	                }
                 }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }

    ]   
  },  

  resolve: {
    extensions: ['.scss','.css','.js', '.jsx', '.json']
  },  

  plugins: [HTMLWebpackPluginConfig, extractSass]
}
