import webpack       from 'webpack';
import autoprefixer  from 'autoprefixer';
import poststylus    from 'poststylus';
import BrowserSync   from 'browser-sync-webpack-plugin';
import indexTemplate from 'html-webpack-template-pug';
import HtmlPlugin    from 'html-webpack-plugin';
import {index}       from './index.manifest';

let env = JSON.stringify(process.env.NODE_ENV)||'"production"';

export default {
  mode: 'development',
  entry:{
    app: ['./src/app/app.js'],
    vendor: ['vue','vue-router','buefy']
  },
  output:{
    path: __dirname+'/dist',
    publicPath: '/',
    sourceMapFilename: '[name].[chunkhash].map',
    filename:'[name].[chunkhash].js'
  },
  devtool: 'source-map',
  plugins:[
    new webpack.DefinePlugin({'process.env.NODE_ENV': env}),
    new webpack.LoaderOptionsPlugin({
      options: {stylus: {use: [poststylus(['autoprefixer'])]}}
    }),
    new HtmlPlugin({
      inject: false,
      template: indexTemplate,
      mobile: true,
      injectExtras: index,
      title: 'dice demo'
    }),
    new BrowserSync({
      host: 'localhost',
      port: 4000,
      server: { baseDir: ['./dist'] }
    })
  ],
  module:{
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/
      },
      {test: /\.css$/, use: ['style-loader','css-loader']},
      {test: /\.styl$/, use: ['style-loader','css-loader','stylus-loader']},
      {test: /\.pug/, use: ['babel-loader','pug-loader']}
    ] //end rules
  } //end module
};

