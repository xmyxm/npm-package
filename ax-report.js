
try {
    const axInfo = require('@dp/acinonyx-info');
    // 上报依赖安装次数
    axInfo.report({
        material:{
            name:"@dp/fish",
            version:"0.1.12"
        }
    },'','install');
} catch (error) {
   console.log('>>>>信息收集失败！')         
};