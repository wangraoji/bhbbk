module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: false,
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000', //目标接口域名
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/api': '/' //重写接口
                }

            }
        }
    }
}