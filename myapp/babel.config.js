module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',        // Expo preset for React Native
      '@babel/preset-react',      // Enables JSX syntax
      '@babel/preset-typescript'  // TypeScript support with JSX
    ],
  };
};
