const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const pro ={
    NODE_ENV: '"production"',
}
module.exports = merge(base,{
	devtool : 'eval-source-map',
	devServer : {
		contentBase : '../src/main',
		historyApiFallback: true,//不跳转
    	inline: true,//实时刷新
        hot : true,
        host : 'localhost'||HOST,
        port : 8080||PORT
    },
    
	plugins : [
        new webpack.DefinePlugin({
            "process.env": pro
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename : 'index.html',
            template : 'index.html',
            inject :true,
        })
	]
})
