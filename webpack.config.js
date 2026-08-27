import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin';
import { globSync } from 'glob';
import WebpackObfuscator from 'webpack-obfuscator';

import multipleHtmlPlugins from './src/client/js/webpack/htmlPage.js';
import multipleJsPlugins from './src/client/js/webpack/jsPage.js';
import commonEnv from './src/client/js/webpack/env/commonEnv.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const PATHS = {
  src: path.join(__dirname, 'src'),
};

export default (env, argv) => {
  const mode = argv.mode === 'development' ? 'development' : 'production';
  const isDevelopment = mode === 'development';

  return {
    mode,

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.scss'],
    },

    devtool: isDevelopment ? 'source-map' : false,

    entry: multipleJsPlugins,

    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },

        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,

            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                url: true,
                esModule: false,
                importLoaders: 2,
              },
            },

            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: 'postcss.config.js',
                },
              },
            },

            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },

        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                context: 'src/',
              },
            },
          ],
        },

        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                context: 'src/',
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),

      new MiniCssExtractPlugin({
        linkType: 'text/css',
        filename: 'css/[name]/[name].css',
      }),

      new webpack.DefinePlugin(commonEnv),

      ...(isDevelopment
        ? []
        : [
            new PurgeCSSPlugin({
              paths: globSync(`${PATHS.src}/**/*`, {
                nodir: true,
              }),
            }),

            new WebpackObfuscator(
              {
                rotateStringArray: true,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                stringArrayThreshold: 0.75,
              },
              ['vendors.*.js'],
            ),
          ]),
    ].concat(multipleHtmlPlugins),

    optimization: {
      runtimeChunk: 'single',

      minimize: true,

      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),

        new CssMinimizerPlugin(),
      ],

      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 150000,
        enforceSizeThreshold: 100000,

        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,

            name(module) {
              const pkg = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
              );

              return `vendor.${pkg?.[1]?.replace('@', '') ?? 'misc'}`;
            },

            chunks: 'all',
          },

          common: {
            name: 'common',
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      },
    },

    performance: {
      hints: false,
      maxEntrypointSize: 500000,
      maxAssetSize: 500000,
    },

    devServer: {
      static: {
        directory: path.resolve(__dirname, 'src'),
      },

      compress: true,

      port: process.env.CLIENT_PORT,

      hot: true,

      client: {
        progress: true,
      },

      historyApiFallback: {
        rewrites: [
          {
            from: /^\/selectGame$/,
            to: '/views/selectGame.html',
          },
          {
            from: /^\/game\/taptap$/,
            to: '/views/game/taptap.html',
          },
          {
            from: /^\/game\/indianPocker$/,
            to: '/views/game/indianPocker.html',
          },
          {
            from: /^\/game\/blackAndWhite1$/,
            to: '/views/game/blackAndWhite1.html',
          },
          {
            from: /^\/game\/findTheSamePicture$/,
            to: '/views/game/findTheSamePicture.html',
          },
        ],
      },

      proxy: [
        {
          context: ['/api'],
          target: `${process.env.JWT_HOST}:${process.env.JWT_PORT}`,
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      ],
    },
  };
};
