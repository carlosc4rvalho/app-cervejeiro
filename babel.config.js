module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@src': './src/',
            '@assets': './src/assets',
            '@images': './src/assets/images',
            '@icons': './src/assets/icons',
            '@fonts': './src/assets/fonts',
            '@backend': './src/backend',
            '@components': './src/components',
            '@context': './src/context',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@services': './src/services',
            '@styles': './src/styles',
          },
        },
      ],
    ],
  };
};
