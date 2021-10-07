
const webpack = require('webpack');

chainWebpack: config =>
    config
        .plugin('feature-flags')
        .use(require('webpack').DefinePlugin, [{
            __VUE_OPTIONS_API__: 'true',
            __VUE_PROD_DEVTOOLS__: 'true'
        }])