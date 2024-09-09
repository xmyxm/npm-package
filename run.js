const execa = require('execa');
const path = require('path');

(async () => {
    const cwd = process.cwd()
    const params = process.argv.splice(2);
    await execa("npm", ['i'], {
        stdio: 'inherit',
        cwd: path.join(cwd, './example'),
    });
    if (params && params.indexOf("env=beta") > -1) {
        await execa("webpack", null, {
            stdio: 'inherit',
            cwd: path.join(cwd, './example'),
        });
    } else {
        await execa("node", ['app.js'], {
            stdio: 'inherit',
            cwd: path.join(cwd, './example'),
        });
    }
})();
