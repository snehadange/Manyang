module.exports = {
  assets: ['./assets/fonts/'],
  transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
};