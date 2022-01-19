const path = require('path');
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin');
const { dirNameApp, archiveName } = require('./getNames');

const settings = {
  devServer: {
    hot: true,
  },
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? 'dist/' : 'http://localhost:8080/',
  pages: {
    index: 'src/main.js',
  },
  chainWebpack(config) {
    Object.keys(settings.pages).forEach((file) => {
      config
        .plugin(`html-${file}`)
        .tap((args) => ([{
          ...args[0],
          filename: path.resolve(__dirname, `${file}.html`),
          alwaysWriteToDisk: true,
        }]));
    });
    config
      .plugin('define')
      .tap((args) => ([{
        ...args[0],
        'window.DIRNAME_APP': `"${dirNameApp}"`,
        'window.ARCHIVE_NAME': `"${archiveName}"`,
        'window.NODE_ENV': `"${process.env.NODE_ENV}"`,
      }]));
  },
  configureWebpack: {
    plugins: [
      new HtmlWebpackHardDiskPlugin(),
    ],
  },
};

module.exports = settings;
