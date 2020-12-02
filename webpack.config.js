const path = require('path');
const HtmlWebpack = require('html-webpack-plugin');

module.exports = {
    entry: "./source/index.ts",

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use : ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(ts|.tsx)$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.tsx']
    },

    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: "min.js"
    },

    devServer: {
        port: 8080,
        open: true,
        hot: true
    },

    plugins: [new HtmlWebpack({
        template: "./source/index.html",
        hash: true,
        filename: "index.html"
    })],
}