module.exports = {
  devServer: {
    disableHostCheck: true,
    host: process.env.HOST,
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [],
    },
  },
};
