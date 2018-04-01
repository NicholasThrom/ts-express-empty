const path = require('path');

module.exports = {
    entry: './app/client/scripts/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'public/scripts')
    },
    mode: process.env.NODE_ENV || 'development',
};
