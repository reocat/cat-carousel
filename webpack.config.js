module.exports = {
  entry: './src/js/load.js',
  mode: 'development',
  output: {
	path: `${__dirname}/dist`,
	filename: 'bundle.js',
  },
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
	}
	],
  },
};
