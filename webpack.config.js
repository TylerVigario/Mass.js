const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'mass': './src/mass.js',
        'mass.min': './src/mass.js',
    },
    output: {
        library: 'Mass.js',
        libraryTarget: 'umd',
        filename: '[name].js',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            include: /\.min\.js$/
        })]
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
};
