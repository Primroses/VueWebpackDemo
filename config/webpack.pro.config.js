const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base.config.js');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const pro ={
    NODE_ENV: '"production"',
}

module.exports = merge(base,{
    devtool : "#source-map",
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    plugins : [
        new webpack.DefinePlugin({
            "process.env": pro
          }),
        new UglifyJSPlugin({
            sourceMap : true,
            parallel: true,
            uglifyOptions: {
                compress: {
                  warnings: false
                }
            },
        }),
        //vue-cli 的源码 处理相同文件的
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks (module) {
              // any required modules inside node_modules are extracted to vendor
              return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                  path.join(__dirname, '../node_modules')
                ) === 0
              )
            }
          }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: 'index.html',
            inject: true,
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
    ],
})