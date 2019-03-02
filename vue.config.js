
module.exports = {
  // 基本路徑
  // 預設值為"/"，這代表如果你的domain叫做http://portfolio/，那他入口頁面的網址就會是http://portfolio/
  // 如果有其他指定入口，則在填寫指定入口，例如網址顯示會是http://portfolio/myindex/，則項目要填寫"/myindex/"
  // baseUrl這個名詞在v3.3已經棄用囉，改成publicPath
  publicPath: '/',
  // 要發佈的資料夾
  // 每次發佈都會先清除一次，要取消清除，敲執行指令時附帶--no-clean
  outputDir: 'dist',
  // 放靜態資源的目錄，預設為空值，依據outputDir的位置而來
  assetsDir: '',
  // 存檔時檢查lint
  lintOnSave: true,
  // 設置webpack的設定，可以是物件，放入plugins，也可以是個function
  configureWebpack: {},
  // 同上，設置webpack，但必須是個函式
  // 基本上釋放更細節的配置，比如放rule、use之類的
  chainWebpack: config => {
    // 更改svg規則
    const svgRule = config.module.rule('svg')
    // 清除
    svgRule.uses.clear()
    // 新增
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  // =======================================
  // CSS項目
  css: {
    // 預設false 只會認得*.module.css|less|sass|scss|styl結尾當作css
    // 所以改成true後，就會把結尾是css|less|sass|scss|styl都視為CSS看待
    modules: true
  },
  // =======================================
  // 伺服器項目
  devServer: {
    // host如果是本地，也可以打localhost(預設127.0.0.1)，0.0.0.0就是本地IPV4位置
    host: '0.0.0.0',
    port: 8080,
    https: false,
    // proxy相關設定
    proxy: null
  }
}
