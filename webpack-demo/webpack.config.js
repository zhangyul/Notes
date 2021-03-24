
import path from 'path';
// var webpack = require("webpack");
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
// webpack-dev-server 实现自动编译打包d
module.exports = {
    mode: 'development',// 'production',
    // 工程资源入口入口，webpack打包哪个文件
    entry: './app.js',
    // {
    //     "index": 'index.js',
    // },
    output: {  // 出口
        //  必须为绝对路径
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',// 输出文件名称
    },
    devSever: {
        port: 3000,// 端口
        pubulicPath: '/dist'
    },
    // 文件加载器  loader
    module: {
        rules: [
            {
                test: /\.css$/,// 文件规则正则
                use: ['style-loader', 'css-loader']

            }
        ]
    },
    plugin: [
        // 压缩代码体积
        new UglifyJsPlugin(),
    ]
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         name: 'public'
    //     },
    //     runtimeChunk: {
    //         name: 'public'
    //     }
    // },
    // module: { //要打包的第三方模块
    //     rules: [
    //         {
    //             test: /\.js|jsx$/,
    //             use: [{
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: ['es2015']
    //                 }
    //             }],
    //             exclude: /node_modules/
    //         },
    //         {
    //             test:
    //                 /\.vue$/,
    //             loader: 'vue-loader'
    //         },
    //         {
    //             test: /\.css$/,
    //             use: ['style-loader', 'css-loader']

    //         },
    //         {
    //             test: /\.(svg|png|wav)$/,
    //             use: [{ loader: 'file-loader?name=images/[hash].[ext]' }]
    //         }
    //     ]
    //     // loaders: [{
    //     //     test: /\.less/,
    //     //     loader: Ex.extract('style-loader', 'css-loader', 'less-loader')  // 单独打包出CSS，这里配置注意下
    //     // }]

    // },
    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"',
    //         'process.env.DEBUG': Boolean(process.env.DEBUG)
    //     }),
    //     new VueLoaderPlugin()
    //     // new HtmlWebpackPlugin({
    //     //     minify: {
    //     //         removeAttributeQuotes: true
    //     //     },
    //     //     hash: true,
    //     //     template: './views/mobile/index.html',
    //     //     chunks: ['index'],
    //     //     filename: '/views/mobile/index.html',
    //     // }),
    //     // new HtmlWebpackPlugin({
    //     //     minify: {
    //     //         removeAttributeQuotes: true
    //     //     },
    //     //     hash: true,
    //     //     template: './views/mobile/user/login.html',
    //     //     chunks: ['user-login'],
    //     //     filename: '/views/mobile/user/login.html',
    //     // }),

    // ]
};
