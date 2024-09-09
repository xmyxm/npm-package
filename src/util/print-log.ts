const printLog = {
  info: (info: any) => {
    console.log("\x1B[32m%s\x1B[39m", info);
  },

  warn: (info: any) => {
    console.log("\x1B[33m%s\x1b[0m:", info);
  },

  error: (info: any) => {
    console.log("\x1B[31m%s\x1B[39m", info);
  },
};

export default printLog;
