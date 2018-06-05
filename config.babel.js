import path from 'path';
import webpack from 'webpack';
import uglify from 'uglifyjs-webpack-plugin';

const mode = process.env.NODE_ENV==='production'?'production':'development',
      filename = mode==='production'?'index.js':'index.development.js',
      devtool = mode==='production'?undefined:'inline-source-map',
      sourceMap = mode==='production'?false:true;

export default {
  mode,
  devtool,
  entry:{
    app: './src/lib/index.js'
  },
  plugins:[
    new uglify({sourceMap}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode)
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

