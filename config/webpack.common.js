const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const nodeExternals = require('webpack-node-externals');


const paths = require('./paths')

module.exports = {
    entry: {
        server: `${paths.src}/server.ts`
    },
    output: {
        globalObject: 'this',
        path: paths.build,
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    plugins: [
        // Removes/cleans build folders and unused assets when rebuilding
        new CleanWebpackPlugin(),
        // Copies files from target to destination folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
        // ESLint configuration
        new ESLintPlugin({
            files: ['.', 'src', 'config'],
            formatter: 'table',
        }),
        // Prettier configuration
        new PrettierPlugin(),
    ],
    // Determine how modules within the project are treated
    module: {
        rules: [
            // Typescript files
            { test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' },
            // Images: Copy image files to build folder
            { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
            // Fonts and SVGs: Inline files
            { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
        ],
    },
    resolve: {
        modules: [paths.src, 'node_modules'],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            '@': paths.src,
        },
    },
    externals: [nodeExternals()],
}
