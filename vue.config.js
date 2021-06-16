module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 3000,
    proxy: {
      '/local': {
        target: "http://localhost:8082",
        ws: true,
        changeOrigin: true
      },
      '/open-apis': {
        target: 'https://open.feishu.cn',
        ws: true,
        changeOrigin: true
      }
    }
  },
  //打包后的位置(如果不设置这个静态资源会报404)
  publicPath: "./",
  //打包后的目录名称
  outputDir: "dist",
  //静态资源目录名称
  assetsDir: "static",
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "测试DEMO"
    }
  },
};
