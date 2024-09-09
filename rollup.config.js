import resolve from '@rollup/plugin-node-resolve'; // rollup不能直接处理依赖，需要通过此插件，此插件通过Node解析算法来定位模块
import commonjs from '@rollup/plugin-commonjs'; // npm上既有esmodule格式的包，也有commonjs的包，rollup可以直接处理第一种，第二种需要通过额外的插件rollup-plugin-commonjs将commonjs转成ES6
import typescript from 'rollup-plugin-typescript2'; // ts 转 js
import multiInput from 'rollup-plugin-multi-input'; // 支持多文件打包
import { uglify } from 'rollup-plugin-uglify'; // es5 代码压缩
import analyze from 'rollup-plugin-analyzer'; // 打印依赖体积分析汇总信息工具

function getPackageJson() {
  // eslint-disable-next-line global-require
  const fs = require('fs');
  const packageJson = fs.readFileSync('./package.json');
  const json = JSON.parse(packageJson);
  return json;
}

const extensions = ['.js', '.ts'];

export default [
  {
    input: 'src/**/*.ts',
    plugins: [
      multiInput({ relative: 'src/' }),
      resolve({ extensions, mainFields: ['jsnext:main', 'module', 'browser'] }),
      commonjs({ exclude: /node_modules/ }),
      typescript(),
    ],
    output: [
      {
        dir: 'build/lib',
        name: 'Fish',
        format: 'cjs',
      },
      {
        dir: 'build/es',
        name: 'Fish',
        format: 'esm',
      },
    ],
  },
  {
    input: 'src/index.ts',
    sourceMap: 'inline',
    plugins: [
      resolve({ extensions, mainFields: ['jsnext:main', 'module', 'browser'] }),
      commonjs({ browser: true, include: /node_modules/ }),
      typescript(),
      uglify(),
      analyze(),
    ],
    output: [
      {
        file: 'build/iife/index.js',
        name: 'Fish',
        format: 'iife',
      },
      {
        file: 'dist/js/fish.js',
        name: 'Fish',
        format: 'iife',
      },
      {
        file: `dist/js/fish.${getPackageJson().version}.js`,
        name: 'Fish',
        format: 'iife',
      },
    ],
  },
];
