import webpack       from 'webpack';
import commonsChunk  from 'webpack/lib/optimize/CommonsChunkPlugin';
import uglifyWebpack from 'webpack/lib/optimize/UglifyJsPlugin';
import autoprefixer  from 'autoprefixer';
import poststylus    from 'poststylus';

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
    publicPath: '/',
    filename:'index.js',
  },
  module:{
    preLoaders: [
//      {test: /\.js$/, loader: 'source-map-loader'}
    ],
    loaders: [
      {test: /\.js$/,   loaders: ['babel-loader','eslint-loader'], exclude: /node_modules/},
      {test: /\.styl$/, loaders: ['style-loader','css-loader','stylus-loader']},
      {test: /\.jade$/, loader: 'jade-static'},
      {test: /\.css$/,  loaders: ['style-loader','css-loader']},
      {test: /\.svg$/,  loader: 'url',
        query:{limit: '65000',mimetype: 'image/svg+xml'}},
      {test: /\.woff$/, loader: 'url',
        query:{limit: '65000',mimetype: 'application/font-woff'}},
      {test: /\.woff2$/,loader: 'url',
        query:{limit: '65000',mimetype: 'application/font-woff2'}},
      {test: /\.[ot]tf$/, loader: 'url',
        query:{limit: '65000',mimetype: 'application/octet-stream'}},
      {test: /\.eot$/, loader: 'url',
        query:{limit: '65000',mimetype: 'application/vnd.ms-fontobject'}}
    ]
  },
  jade: {pretty: false},
  stylus: {use: [poststylus(['autoprefixer'])]}
};

