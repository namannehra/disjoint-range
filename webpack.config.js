'use strict'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const path = require('path')

const packageJson = require('./package.json')

delete packageJson.scripts
delete packageJson.private
delete packageJson.devDependencies

const config = {
    mode: 'production',
    entry: './src/DisjointRange.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'DisjointRange.js',
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
        new CleanWebpackPlugin('build'),
        new CopyPlugin([
            {
                from: '@(LICENSE|README.md)',
            },
        ]),
        new GenerateJsonPlugin('package.json', packageJson, undefined, 4),
    ],
}

module.exports = config