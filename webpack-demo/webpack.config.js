
const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// HMR 文件热更新
// 文件压缩定制
const TerserWebpackPlugin = require('terser-webpack-plugin');
// 打包分析插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// HappyPack || thread-loader[需要写于所有loader之前] 支持多线程打包
// webpack-dev-server 实现自动编译打包
// tree-shaking
module.exports = {
    // 压缩相关配置
    optimization: {
        minimizer: [new TerserWebpackPlugin({
            // 加快构建速度
            cache: true,
            // 开启多线程提高打包速度
            // parallel:true,
            terserOptions: {
                compress: {
                    // 无用代码
                    unused: true,
                    // 调试信息
                    drop_debugger: true,
                    // 输出
                    drop_console: true,
                    dead_code: true,
                }
            }
        })]
    },
    // mode: 'development',// 'production',
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
    devServer: {
        port: 3000,// 端口
        publicPath: '/dist',
        // HMR热更新配置
        hot: true,
    },
    // 文件加载器  loader
    module: {
        //  不解析的文件，此类文件中不应包含import等语法
        noParse:/node_modules\/(jquery\.js)/,
        rules: [
            {
                test: /\.js?/,// 文件规则正则
                exclude: /node_modules/,// 不参与编译的文件目录
                // include:// 需要被打包的文件 
                use: {
                    loader: 'babel-loader',
                    options: {
                        // babelrc: false,// 规则全部存在于options中
                        // presets: ['es2015'],
                        // cacheDirectory: false,// 是否缓存编译结果
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']

            }
        ]
    },
    plugins: [
        // 压缩代码体积
        // new UglifyJsPlugin(),
        // 编译html文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html', // 输出文件名
        }),
        // HMR文件热更新
        // new webpack.HotModuleReplacementPlugin(),        
        new BundleAnalyzerPlugin(),
    ],
};
