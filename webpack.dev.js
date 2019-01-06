const pathLib = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const config = require('./config/config');

const ROOT_PATH = pathLib.resolve(__dirname);
const ENTRY_PATH = pathLib.resolve(ROOT_PATH, 'src');
const ENTRY_PATH2 = pathLib.resolve(ROOT_PATH, 'src/pages');

const OUTPUT_PATH = pathLib.resolve(ROOT_PATH, 'build');

const HappyPack = require('happypack'); //多线程运行
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    entry: {
        /*index: [
            //'react-hot-loader/patch',
            //`webpack-hot-middleware/client?path=http://${config.host}:${config.port}/__webpack_hmr`,
            //'babel-polyfill',
            pathLib.resolve(ENTRY_PATH, 'index.js')
        ],*/
        index: [
            'babel-polyfill',
            pathLib.resolve(ENTRY_PATH2, './index/index.js')
        ],
        admin: [
            'babel-polyfill',
            pathLib.resolve(ENTRY_PATH2, './admin/index.js')
        ],
        vendor: ['react', 'react-dom', 'react-router-dom', 'react-hot-loader/patch', `webpack-hot-middleware/client?path=http://${config.host}:${config.port}/__webpack_hmr`,]
    },
    //entry: pathLib.resolve(ENTRY_PATH, 'index.js'),
    output: {
        path: OUTPUT_PATH,
        publicPath: '/',
        filename: 'js/[name]-[hash:8].js',
        //filename: '[name]-[hash:8].bundle.js',
        //chunkFilename: '[name]-[id].[hash:8].bundle.js'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
                //loader: 'happypack/loader?id=babel'
                /*,
                include: pathLib.resolve(__dirname, 'app/containers/homeAntd')*/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
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
        new CleanPlugin(['build']),
        new ProgressBarPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),//改善chunk传输
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "progress.env.NODE_ENV": JSON.stringify('development')
        }),
        //new webpack.optimize.UglifyJsPlugin(), //最小化一切
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
        new webpack.HashedModuleIdsPlugin(),//用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest"
        }),
        /*,
        // modify
        new OpenBrowserPlugin({
            url: `http://${config.host}:${config.port}`
        })*/
        new HappyPack({
            //多线程运行 默认是电脑核数-1
            id: 'babel', //对于loaders id
            loaders: ['cache-loader','babel-loader?cacheDirectory'], //是用babel-loader解析
            threadPool: happyThreadPool,
            verboseWhenProfiling: true, //显示信息
        })/*,
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dll/manifest.json')
        })*/
    ],
    resolve: {
        alias:{
			'@components':pathLib.resolve(__dirname,'./src/components'),
			'@reducers':pathLib.resolve(ROOT_PATH, 'src/reducers'),
            //'@reducers':'./src/reducers',
            '@mlib':pathLib.resolve(__dirname,'./mlib')
		},
        extensions: ['.js', 'jsx', '.json', '.sass', '.scss', '.less']
    }
};
