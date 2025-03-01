export default {
  presets: [
    "@babel/preset-env",
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
