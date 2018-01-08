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
  entry: './index.jsx',
  output: {
    filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ['env', 'react', 'stage-1']
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
            }
        ]
    },
    plugins: _.compact([
        rootHtml,
        extractCSSMod
    ]),
    devServer: {
        contentBase: './build',
        https: false,
        host: '0.0.0.0',
        port: 3000,
        filename: 'main.js',
        hot: false,
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
};
