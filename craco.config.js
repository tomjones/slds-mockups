const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the babel-loader rule
      const babelLoaderRule = webpackConfig.module.rules
        .find(rule => rule.oneOf)
        .oneOf.find(
          rule => rule.loader && rule.loader.includes('babel-loader') && rule.include
        );

      // Add @salesforce/design-system-react to the include list
      if (babelLoaderRule) {
        const originalInclude = babelLoaderRule.include;
        babelLoaderRule.include = [
          originalInclude,
          path.resolve(__dirname, 'node_modules/@salesforce/design-system-react'),
        ];
      }

      // Disable source-map-loader for the salesforce package
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.enforce === 'pre' && rule.use) {
          const sourceMapLoader = rule.use.find(
            use => use.loader && use.loader.includes('source-map-loader')
          );
          if (sourceMapLoader) {
            rule.exclude = /node_modules\/@salesforce\/design-system-react/;
          }
        }
        return rule;
      });

      return webpackConfig;
    },
  },
};
