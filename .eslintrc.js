module.exports = {
    //此项是用来告诉eslint找当前配置文件不能往父级查找
    root: true,
    // 脚本运行环境
    env: {
        "browser": true,
        "node": true, // webpack所以需要node一些环境变量
        "es6": true
    },
    // 额外的全局变量
    globals: {
        window: true,
        history: true,
        location: true
    },
    // ESLint 默认使用Espree作为其解析器，@typescript-eslint/parser作为ESLint的解析器，用于解析typescript，从而检查和规范Typescript代码
    parser: "@typescript-eslint/parser",
    // 所有的规则默认都是禁用的。在配置文件中，使用 "extends": "eslint:recommended" 来启用推荐的规则，报告一些常见的问题
    extends: [
        "airbnb-base",
        "eslint:recommended"
    ],
    parserOptions: {
        "ecmaVersion": 2019, // 指定你想要使用的 ECMAScript 版本 (2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）)
        "sourceType": "module", // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
        "ecmaFeatures": { // 表示你想使用的额外的语言特性
            "experimentalObjectRestSpread": true // 启用实验性的 object rest/spread properties 支持
        }
    },
    // 通常输出规则。一些插件也可以输出一个或多个命名的配置。ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。插件名称可以省略 eslint-plugin- 前缀
    plugins: [
        "@typescript-eslint/eslint-plugin",
        "markdown" // eslint-plugin-markdown 可以检查 Markdown、 HTML以及其它语言文件中的代码
    ],
    // 开启规则和发生错误时报告的等级
    rules: {
        "no-console": "off",
        "no-plusplus": "off",
        "max-len": "off",
        "func-names": "off",
        "no-bitwise": "off",
        "object-curly-newline": "off",
        "import/no-unresolved": "off",
        "no-unused-expressions": ["error", { "allowShortCircuit": true }],
        "no-multi-assign": "off", // 链接变量的赋值可能会导致意外的结果并难以阅读 https://cloud.tencent.com/developer/section/1135717
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        '@typescript-eslint/no-unused-vars': ['error', {
            'vars': 'all',
            'args': 'none',
            'ignoreRestSiblings': true,
        }],
        "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
        "@typescript-eslint/indent": ["error", 2], // 强制缩进， 2个空格或者tab缩进
        'import/extensions': ['error', 'never', { js: 'never', ts: 'never', mjs: 'never' }],
    },
    settings: {
       
    }
}
