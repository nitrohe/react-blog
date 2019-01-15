const pathLib = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const ROOT_PATH = pathLib.resolve(__dirname);
const ENTRY_PATH = pathLib.resolve(ROOT_PATH, 'src');
const ENTRY_PATH_PAGES = pathLib.resolve(ROOT_PATH, 'src/pages');
const OUTPUT_PATH = pathLib.resolve(ROOT_PATH, 'build');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        index: ['babel-polyfill',pathLib.resolve(ENTRY_PATH_PAGES, './index/index.js')],
        admin: ['babel-polyfill',pathLib.resolve(ENTRY_PATH_PAGES, './admin/index.js')],
        vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux', 'redux-saga', 'react-hot-loader/patch', ]
    },
    output: {
        path: OUTPUT_PATH,
        publicPath: '/',
        filename: '[name]-[chunkhash].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test:/\.css$/,
                exclude:/node_modules/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                modules:true,
                                localIdentName:'[name]-[local]-[hash:base64:5]',
                                importLoaders:1
                            }
                        },
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader',
                    {
                        loader: 'css-loader'
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: ["style-loader", 'css-loader', "postcss-loader", "less-loader"]
            },
            {
                test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        //打包分析工具
        //new BundleAnalyzerPlugin(),
        new CleanPlugin(['build']),
        new ProgressBarPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),//改善chunk传输
        //new webpack.DefinePlugin({
        //    "progress.env.NODE_ENV": JSON.stringify('production')
        //}),
        new webpack.DefinePlugin({
           "progress.env.NODE_ENV": JSON.stringify('production')
        }),
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         "NODE_ENV": JSON.stringify("production")
        //     }
        // }),
        //new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            show_copyright: false,
            comments: false,
            compress: {
               warnings: false,
               drop_debugger: true,
               drop_console: true
           }
        }),
        /*new HtmlWebpackPlugin({
            title: "Nitrohe's Blog",
            showErrors: true,
        }),*/
        new HtmlWebpackPlugin({
			title: "Nitrohe's Blog",
			meta:{
				keywords:  "",
				description: "Nitrohe's Blog"
			},
			//chunks:[`${item}/${item}`], //引入的js
			//template: "./src/template.html",
			filename : "index.html" , //html位置
			minify:{//压缩html
				collapseWhitespace: true,
				preserveLineBreaks: true
			},
            chunks: ['manifest', 'vendor', 'index'],
            chunksSortMode:'dependency'
		}),
        new HtmlWebpackPlugin({
			title: "Nitrohe's Admin",
			meta:{
				keywords:  "",
				description: "Nitrohe's Admin"
			},
			//chunks:[`${item}/${item}`], //引入的js
			//template: "./src/template.html",
			filename : "admin.html" , //html位置
			minify:{//压缩html
				collapseWhitespace: true,
				preserveLineBreaks: true
			},
            chunks: ['manifest', 'vendor', 'admin'],
            chunksSortMode:'dependency'
		}),
        new webpack.NoEmitOnErrorsPlugin(),//保证出错时页面不阻塞，且会在编译结束后报错
        new ExtractTextPlugin({
            filename:'bundle.[contenthash].css',
            disable:false,
            allChunks:true
        }),
        new webpack.HashedModuleIdsPlugin(),//用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') == -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest"
        })
    ],
    resolve: {
        alias:{
			'@components':pathLib.resolve(__dirname,'./src/components'),
			'@reducers':pathLib.resolve(ROOT_PATH, './src/reducers'),
            //'@reducers':'./src/reducers',
            '@mlib':pathLib.resolve(__dirname,'./mlib')
		},
        extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx']
    }
};
