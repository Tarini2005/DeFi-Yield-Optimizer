const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: './src/assets/images/favicon.ico'
      }),
      new DotenvWebpackPlugin({
        systemvars: true
      })
    ],
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'public')
      },
      port: 3000,
      hot: true,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          pathRewrite: { '^/api': '' },
          changeOrigin: true
        }
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: 'single',
      minimize: isProduction
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map'
  };
};
