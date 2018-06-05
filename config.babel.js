import path from 'path';
import webpack from 'webpack';
import uglify from 'uglifyjs-webpack-plugin';

const env = process.env.NODE_ENV==='production'?'production':'development',
      filename = env==='production'?'index.js':'index.development.js';

export default {
  mode: env,
  devtool: 'source-map',
  entry:{
    app: './src/lib/index.js'
  },
  plugins:[
    new uglify({sourceMap: true}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  output:{
    path: path.resolve('./'),
    filename,
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

