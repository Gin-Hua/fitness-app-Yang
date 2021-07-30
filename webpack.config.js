/**
 * webpack 打包配置文件
 */
// 导入nodejs内置库
const path = require('path');

// 导入三方插件包
const HtmlWebpackPlugin = require('html-webpack-plugin');

//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

//自动清除dist 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    //入口----程序主模块
    entry: {
        // 公共样式
        common: './src/js/common.js',
        dom: './src/js/common/dom.js',
        http: './src/js/common/http.js',

        // 三方插件库
        captcha: './src/lib/captcha/captcha-mini.js',
        // 页面样式
        login: './src/js/login.js',
        home: './src/js/home.js',
        register: './src/js/register.js',
        advertisement: './src/js/advertisement.js',
        my: './src/js/my.js'

    },
    //出口----最终生成的文件的放置位置
    output: {
        path: path.resolve(__dirname, 'dist'),       //  绝对路径
        filename: 'js/[name].js',  //  生成的名字
        publicPath: './'
    },
    // loader 解释器
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                        // 返回到dist目录
                    }
                }, "css-loader", 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, "css-loader", 'postcss-loader', "less-loader"]
            },
            // 配置图片loader
            {
                test: /\.(png|jpg|gif|jpeg|JPG)$/, //配置css中的图片打包
                loader: 'url-loader',     //只有一个处理的loader的写法  
                //可以通过url-loader 将图片压缩为 base64编码格式的图片
                //大图就不压缩  小图可以压缩
                options: {
                    name: '[hash:16].[ext]',  // 图片输出的名字hash长度16位 默认32位
                    limit: 30 * 1024,  // 限制 小于30kb base64处理
                    esModule: false,
                    outputPath: 'img'           // 设置img打包之后的文件路径
                }
            },
            // 配置html
            {
                test: /\.html$/,    //配置html文件打包
                loader: 'html-loader',
            },
            // 字体图标
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/, //配置iconfont文件打包
                loader: 'file-loader',
                options: {
                    outputPath: "fonts"
                }
            },
            // es6转es5
            {
                test: /\.js$/,
                loader: 'babel-loader',    // loader 编译es6为es5
                exclude: /node_modules/  // 排除
            }
        ]
    },
    //plugin 插件
    plugins: [
        // new 插件名({
        //     配置  key:value
        // })
        //配置html打包的插件
        new HtmlWebpackPlugin({
            template: './src/page/login.html',         //以哪个html文件作为打包的模板
            filename: 'login.html',
            chunks: ['login', 'common', 'dom', 'http']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/home.html',      //以哪个html文件作为打包的模板
            filename: 'home.html',
            chunks: ['home', 'common', 'dom', 'http']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/register.html',      //以哪个html文件作为打包的模板
            filename: 'register.html',
            chunks: ['register', 'common', 'dom', 'captcha', 'http']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/advertisement.html',      //以哪个html文件作为打包的模板
            filename: 'advertisement.html',
            chunks: ['advertisement', 'common', 'dom', 'http']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/my.html',      //以哪个html文件作为打包的模板
            filename: 'my.html',
            chunks: ['my', 'common', 'dom', 'my']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出到css文件夹里
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new CleanWebpackPlugin()
    ],
    //mode 环境   development:开发环境  production：生产环境（线上环境）
    // mode: 'development',
    mode: process.env.NODE_ENV,
    //webpack.config.js   
    // 开发服务器 配置【】
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8080,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'my.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器
}