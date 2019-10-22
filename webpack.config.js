const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        // US
        'Mass_US': './src/Mass_US.js',
        'Mass_US.min': './src/Mass_US.js',
        // UK
        'Mass_UK': './src/Mass_UK.js',
        'Mass_UK.min': './src/Mass_UK.js',
        // SI
        'Mass_SI': './src/Mass_SI.js',
        'Mass_SI.min': './src/Mass_SI.js',
    },
    output: {
        library: 'mass.js',
        libraryTarget: 'umd',
        filename: '[name].js',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this'
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
