const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}

const json = require('./package.json')
const FileManagerPlugin = require('filemanager-webpack-plugin')
// eslint-disable-next-line camelcase
module.exports = {

  outputDir: '../all/' + json.name + '-v' + json.version.slice(2),
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('views', resolve('./src/views'))
      .set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
    // set第一个参数：设置的别名，第二个参数：设置的路径
  },
  runtimeCompiler: true,
  productionSourceMap: false,

  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "assets/css/index.scss";'
      }, css: {}, postcss: {
        plugins: [require('autoprefixer'), // 把px单位换算成rem单位
          require('postcss-pxtorem')({
            rootValue({file}) {
              return file.indexOf('vant') !== -1 ? 37.5 : 30
            }, selectorBlackList: ['.van', ':root'], // 要忽略的选择器并保留为px。
            propList: ['*'], // 可以从px更改为rem的属性。
            minPixelValue: 2 // 设置要替换的最小像素值。
          })]
      }
    }
  },
  configureWebpack: {
    plugins: [new FileManagerPlugin({
      events: {
        onEnd: {
          archive: [{
            source: '../all/' + (json.name + '-v' + json.version.slice(2)) + '',
            destination: '../all/' + (json.name + '-v' + json.version.slice(2)) + '.zip'
          }]
        }
      }
    })]
  },
  devServer: {
    proxy: {
      '/': {
        target: 'https://co.lotvod.com/', changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '' // 需要rewrite的,
        }
      }
    }, port: 8080, host: '0.0.0.0'
  }
}
