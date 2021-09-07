/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  return {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/test.ts'),
    devServer: {
      static: {
        directory: path.join(__dirname, 'public')
      }
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    },
    output: {
      path: path.resolve(__dirname, 'public/dist'),
      filename: 'index.js',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve('src')
      }
    }
  }
}
