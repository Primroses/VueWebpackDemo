const path = require('path');
const choose = {
    dev : "/",
    pro : './'
}
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry : {
        app : "./src/main.js"
    },
    output : {
        filename : '[name].js',
        path : path.resolve(__dirname, '../dist'),
        publicPath: process.env.NODE_ENV === 'production'
        ? choose.pro
        : choose.dev
    },
    resolve : {
        extensions:['.js','.json','.vue'],
        alias: {
            'vue': 'vue/dist/vue.js'

        }
    },
    module:{
        rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            },
            {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/
            },
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
              }
            },
            {
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'media/[name].[hash:7].[ext]'
              }
            },
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'fonts/[name].[hash:7].[ext]'
              }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                  ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                  ]
            }
        ]
    }
}