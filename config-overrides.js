const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
     fixBabelImports('import', {
     libraryName: 'bootstrap',
     libraryDirectory: 'es',
     style: 'css',
      }),
    );