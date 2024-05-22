import path from 'path'
import { type Configuration } from 'webpack'
import { type Configuration as DevServerConfiguration } from 'webpack-dev-server'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

interface Environment {
  development: boolean
  production: boolean
}

const isDevelopment = (env: Environment) => env.development
const getConfig = (env: Environment): Configuration => {
  console.log('env', isDevelopment(env) ? 'development' : 'production')
  const config: Configuration = {
    mode: isDevelopment(env) ? 'development' : 'production',
    devtool: isDevelopment(env) ? 'eval-cheap-source-map' : false,

    entry: path.join(__dirname, 'src', 'index.tsx'),
    // entry: path.join(__dirname, 'src', 'module', 'index.ts'),

    output: {
      path: path.join(__dirname, 'dist'),
      filename: isDevelopment(env) ? '[name].js' : '[name].[chunkhash].js',
      chunkFilename: '[name].chunk.js',
      clean: true
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },

    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: 'last 2 versions, > 1%, not dead'
                    }
                  ],
                  '@babel/preset-react'
                ]
              }
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                experimentalWatchApi: true
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader'
            }
          ]
        }
      ]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),

      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html')
        // excludeChunks: ['shader']
      })
    ],

    devServer: {
      static: path.join(__dirname, 'public'),
      compress: true,
      historyApiFallback: true,
      port: 3000
    } satisfies DevServerConfiguration
    // optimization: {
    //   splitChunks: {
    //     chunks: 'all',
    //     minSize: 200,
    //     maxSize: 0,
    //     minChunks: 1,
    //     maxAsyncRequests: 6,
    //     maxInitialRequests: 4,
    //     automaticNameDelimiter: '~',
    //     cacheGroups: {
    //       defaultVendors: {
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: -10
    //       },
    //       default: {
    //         minChunks: 2,
    //         priority: -20,
    //         reuseExistingChunk: true
    //       }
    //     }
    //   }
    // }
  }

  return config
}

export default getConfig
