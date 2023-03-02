const path = require('path');
var WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
  entry: './src/js/load.js',
  mode: 'development',
  output: {
	path: `${__dirname}/dist`,
	filename: 'bundle.js',
  },

  plugins: [
        new WebpackObfuscator({rotateStringArray: true, reservedStrings: [ '\s*' ]}, [])
    ],
  module: {
	rules: [
	  {
		test: /\.css$/,
		use: [
		  'style-loader',
		  'css-loader',
		],
	  },
       {
         test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
         use: ['file-loader']
       },
       { 
	 test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
	 use: ['url-loader?limit=100000'] 
	},
	{
	  enforce: 'post',
	  use: {
	        loader: WebpackObfuscator.loader,
        	options: {
            		rotateStringArray: true,
            		reservedStrings: [ '\s*' ]
        	}
    	  }
	}
	],
  },
};
