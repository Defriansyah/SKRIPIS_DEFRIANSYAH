const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // konfigurasi webpack lainnya
    plugins: [
        new BundleAnalyzerPlugin()
    ]
};
