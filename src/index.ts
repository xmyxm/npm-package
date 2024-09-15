import getTime from "./util/format-date";
import printLog from "./util/print-log";
const VERSION = "0.0.1";

enum ConsoleType {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

class Log {
  name: string;
  version: string;
  // 构造函数，用于初始化对象的属性
  constructor(name: string) {
    this.name = name;
    this.version = VERSION;
  }

  info(text: string) {
    this.writeText(ConsoleType.INFO, text);
  }

  warn(text: string) {
    this.writeText(ConsoleType.WARN, text);
  }

  error(text: string) {
    this.writeText(ConsoleType.ERROR, text);
  }

  writeText(funName: ConsoleType, text: string): void {
    const fun: Function = printLog[funName]
    fun(`${this.name}|${getTime()}: ${text}`);
  }

  // 定义一个静态方法，不需要实例化类即可调用
  static getEnv(): string {
    return 'pro'
  }

  // 定义一个静态方法，不需要实例化类即可调用
  getName() {
    console.log(this.name);
  }

  getVersion() {
    console.log(this.version);
  }
}

export default Log;
