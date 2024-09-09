import getTime from "./util/format-date";
import printLog from "./util/print-log";
const VERSION = "0.0.1";

class Log {
  name: string;
  version: string;
  // 构造函数，用于初始化对象的属性
  constructor(name: string) {
    this.name = name;
    this.version = VERSION;
  }

  info(text: string) {
    this.writeText("info", text);
  }

  warn(text: string) {
    this.writeText("warn", text);
  }

  error(text: string) {
    this.writeText("error", text);
  }

  writeText(funName: string, text: string) {
    printLog[funName](`${this.name}|${getTime()}: ${text}`);
  }

  // 定义一个静态方法，不需要实例化类即可调用
  static getName() {
    console.log(this.name);
  }

  static getVersion() {
    console.log(this.version);
  }
}

export default Log;
