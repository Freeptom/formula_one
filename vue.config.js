const path = require('path');
module.exports = {
  devServer: {
    disableHostCheck: true,
    host: process.env.HOST,
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/variables/*.scss'),
        path.resolve(__dirname, './src/mixins/*.scss'),
      ],
    },
  },
};
