module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        allowUndefined: false,
      }
    ],
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          '@auth': './src/features/auth',
          '@i18n': './src/i18n',
          '@navigation': './src/navigation',
          '@shared': './src/shared',
          '@store': './src/store',
          '@transactions': './src/features/transactions',
        },
      },
    ],
  ],
};
