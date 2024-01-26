const { defineConfig } = require("@vue/cli-service")
const pageTitle = 'PAL'
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "palworld": {
        target: "https://activity-api.iyingdi.com",
        changeOrigin: true,
        pathRewrite: {
          "^/palworld": "palworld",
        },
      },
    },
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = pageTitle // 替换为你的实际标题
        return args
      })
  }
})
