'use strict'

const GLOBAL_WEBPACK = require('webpack')
const GLOBAL_PATH = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const resolve = dir => GLOBAL_PATH.join(__dirname, dir)
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'favorite-kits.min.js',
        path: resolve('dist'),
        library: {
            name: 'FKits',
            type: 'umd'
        }
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: resolve('node_modules'),
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    resolve: {
        fallback: {
            buffer: resolve('buffer/')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new GLOBAL_WEBPACK.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false
            })
        ]
    }
}
