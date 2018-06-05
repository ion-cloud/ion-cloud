import path from 'path';
import webpack from 'webpack';
import uglify from 'uglifyjs-webpack-plugin';

export default {
  mode: 'production',
  devtool: 'source-map',
  entry:{
    app: './src/lib/index.js'
  },
  plugins:[
    new uglify({sourceMap: true}),
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

