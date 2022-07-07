module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //对按需引入插件做的配置
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      }
    ]
  ]
}
