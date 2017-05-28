import webpack       from 'webpack';

export default {
  entry:{
    app: './src/lib/index.js'
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {warnings: false},
      output: {comments: false},
    }),
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'}})
  ],
  output:{
    path: './',
    filename:'index.js',
    umdNamedDefine: true,
    libraryTarget: 'umd',
    library: 'ion'
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/
      }
    ]
  }
};

