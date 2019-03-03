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
        path: path.resolve(__dirname, 'build/disjoint-range'),
        filename: 'DisjointRange.js',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use:  {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            declaration: true,
                            outDir: 'build/disjoint-range',
                        },
                        onlyCompileBundledFiles: true,
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin('build/disjoint-range'),
        new GenerateJsonPlugin('package.json', packageJson, undefined, 4),
        new CopyPlugin([
            {
                from: '@(LICENSE|README.md)',
            },
        ]),
    ],
}

module.exports = config