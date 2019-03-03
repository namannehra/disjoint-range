'use strict'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

const config = {
    mode: 'development',
    entry: './tests/index.ts',
    output: {
        path: path.resolve(__dirname, 'build/tests'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin('build/tests'),
    ],
}

module.exports = config