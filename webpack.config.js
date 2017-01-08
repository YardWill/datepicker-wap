// webpack.config.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        test: './test/test-es6.js',
    },
    output: {
        path: path.join(__dirname, '/test/'),
        filename: '[name].js',
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.jsx?$/, loader: 'babel-loader', query: { presets: ['es2015'] } }
        ],
    },
    plugins: [
        // 提取公共文件
        // new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        // new webpack.DefinePlugin({
        //     'process.env': { NODE_ENV: JSON.stringify('production') },
        // }),
        // 如需压缩js文件，将以下注释去掉
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     warnings: false
        //   }
        // })
    ],
};
