module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "plugin:vue/vue3-recommended"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    semi: [2, "never"],
    // 统一缩进2个空格
    indent: ["error", 2],
    // 箭头函数的箭头前后都有空格
    "arrow-spacing": "error",
    // 小括号前后禁用空格
    "space-in-parens": [2, "never"],
    // 要求非空文件末尾存在一行空行
    // "eol-last": "error",
    // 确保最多只有一个空行，多余空行将被警告或错误
    "no-multiple-empty-lines": ["error", {
      "max": 1,
      "maxEOF": 1, // 可选，表示文件末尾允许的最大空行数
      "maxBOF": 0, // 可选，表示文件开头允许的最大空行数
      "maxBlankLines": 1, // 在某些旧版本中可能需要这个选项，新版本中通常包含在“max”内
      "ignorePatterns": ["comments"] // 可选，忽略特定注释内的多行空格
    }],
    // 禁止行尾空格
    "no-trailing-spaces": "error",
    // 禁止出现多行空行
    "no-multiple-empty-lines": "error",
    // 禁止在单行内非缩进情况出现多个空格
    "no-multi-spaces": "error",
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 10
      },
    }],
    "vue/no-multi-spaces": ["error", {
      "ignoreProperties": false
    }],
    // "vue/singleline-html-element-content-newline": ["error", {
    //   "ignoreWhenNoAttributes": true,
    //   "ignoreWhenEmpty": true,
    //   "ignores": ["pre", "textarea", ...INLINE_ELEMENTS],
    //   "externalIgnores": []
    // }]
  }
}
