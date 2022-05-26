module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      'inline-dotenv',      
      [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@theme': './src/global/styles',
          '@global': './src/global',
          '@utils': './src/utils',
          '@routes': './src/routes',
        }
      }
    ]
  ]
  };
};