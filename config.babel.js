import path from 'path';
import webpack from 'webpack';
import uglify from 'uglifyjs-webpack-plugin';

export default {
  mode: 'production',
  entry:{
    app: './src/lib/index.js'
  },
  plugins:[
    new uglify(),
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'}})
  ],
  output:{
    path: path.resolve('./'),
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

