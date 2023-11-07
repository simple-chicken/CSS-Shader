import path from 'path';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

interface Environment {
  development: boolean;
  production: boolean;
}

const isDevelopment = (env: Environment) => env.development;

const getConfig = (env: Environment): Configuration => {
  const config: Configuration = {
    mode: isDevelopment(env) ? 'development' : 'production',
    devtool: isDevelopment(env) ? 'eval-cheap-source-map' : false,

    entry: path.join(__dirname, 'src', 'index.tsx'),

    output: {
      path: path.join(__dirname, 'build'),
      filename: isDevelopment(env) ? '[name].js' : '[name].[chunkhash].js',
      clean: true,
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'last 2 versions, > 1%, not dead',
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          }
          ],
        },
        {
          test: /\.module\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),

      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
    ],

    devServer: {
      static: path.join(__dirname, 'build'),
      compress: true,
      historyApiFallback: true,
      port: 3000,
      open: true,
    } as DevServerConfiguration,
  };

  return config;
};

export default getConfig;
