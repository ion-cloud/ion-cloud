import webpack       from 'webpack';
import uglifyWebpack from 'webpack/lib/optimize/UglifyJsPlugin';

export default {
  entry:{
    app: [
      './src/app/vendor/easel.js',
      './src/app/vendor/ion.js',
      './src/app/vendor/ionCloud.js'
    ],
  },
//  devtool: 'source-map',
  plugins:[
    new uglifyWebpack({minimize: true,mangle: false}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  output:{
    path: './',
    filename:'index.js',
    umdNamedDefine: true,
    libraryTarget: 'umd',
    library: 'ion'
  },
  module:{
    preLoaders: [
//      {test: /\.js$/, loader: 'source-map-loader'}
    ],
    loaders: [
      {test: /\.js$/,   loaders: ['babel-loader','eslint-loader'], exclude: /node_modules/}
    ]
  }
};

