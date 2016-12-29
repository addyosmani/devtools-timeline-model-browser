const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
    entry: './src/lib.js',
    target: 'web',
    output: {
        path: './dist',
        filename: 'timeline-model-browser.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new BabiliPlugin()
    ]
};