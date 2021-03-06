const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const _ = require('lodash')
const path = require('path')


const rootHtml = new HtmlPlugin({
    template: path.resolve(__dirname, './index.template.ejs'),
    filename: 'index.html',
    inject: 'body'
})

const extractCSSMod = new ExtractTextPlugin({
    filename: 'style-mod.css',
    allChunks: true
})

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ['env', 'react', 'stage-1'],
                        plugins: ['add-module-exports']
                    }
                }]
            },
            {
                test: /\.mod\.scss$/,
                loader: extractCSSMod.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                camelCase: true,
                                context: __dirname, // https://github.com/webpack-contrib/css-loader/issues/413
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')
                                ]
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [path.resolve(__dirname, './node_modules')],
                                precision: 10
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'constants': path.resolve(__dirname, 'src/constants/index.jsx'),
            'css-colors': path.resolve(__dirname, 'src/ui-components/styles/colors.mod.scss'),
            'css-constants': path.resolve(__dirname, 'src/ui-components/styles/constants.mod.scss'),
            'icons': path.resolve(__dirname, 'src/icons/index.jsx'),
            'ui': path.resolve(__dirname, 'src/ui-components/index.jsx'),
            'utils': path.resolve(__dirname, 'src/utils/index.jsx')
        }
    },
    plugins: _.compact([
        rootHtml,
        extractCSSMod
    ]),
    devServer: {
        contentBase: 'dist',
        historyApiFallback: {
            index: 'index.html',
            rewrites: [
                { from: /\/trip\/bundle.js/, to: '/bundle.js' },
                { from: /\/trip\/style-mod.css/, to: '/style-mod.css' }
            ]
        },
        proxy: {
            '/api': 'http://localhost:4000',
            '/auth': 'http://localhost:5000'
        },
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            children: false
        }
    }
}
