const path = require("path");

module.exports = {
  publicPath: "/WZActivityFront/",
  chainWebpack: (config) => {
    const entry = config.entry("app");
    entry
      .add("babel-polyfill") //一定要在首行引入，否则IE浏览器还是会报错
      .end();
    // (1.) To handle editor icons, get the default rule for *.svg files first:
    const svgRule = config.module.rule("svg");
    svgRule.exclude.add(path.join(__dirname, "node_modules", "@ckeditor"));

    config.module.rules.delete("eslint");
  },
};
