/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  const { mode = 'development' } = argv

  const externals = {
    three: ['script https://unpkg.com/three@0.131.2/build/three.min.js', 'THREE']
  }

  const plugins = []

  return {
    mode,
    entry: path.resolve(__dirname, mode === 'production' ? 'src/index.ts' : 'src/test.ts'),
    devServer: {
      static: {
        directory: path.join(__dirname, 'public')
      }
    },
    optimization: {
      minimize: mode === 'production',
      minimizer: [new TerserPlugin()]
    },
    output: {
      path: path.resolve(__dirname, mode === 'production' ? 'dist' : 'public/dist'),
      filename: 'index.js',
      libraryTarget: 'umd'
    },
    externals,
    plugins,
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
