require('regenerator-runtime/runtime');
require('babel-register')({
    presets: [ 'env' ]
});

require('./src/index').init();
