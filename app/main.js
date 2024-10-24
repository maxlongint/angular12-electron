const { app, BrowserWindow, screen, ipcMain } = require('electron');
const { fork } = require('child_process');
const path = require('path');
const fs = require('fs');
const url = require('url');

const args = process.argv.slice(1),
    serve = args.some(val => val === '--serve');

function createWindow() {
    const electronScreen = screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;

    // 创建浏览器窗口。
    win = new BrowserWindow({
        center: true,
        width: size.width * 0.8,
        height: size.height * 0.8,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: serve ? true : false,
            contextIsolation: false, // 如果你想使用Spectron进行端到端测试，请设置为false
        },
    });

    if (serve) {
        win.webContents.openDevTools();
        require('electron-reload')(__dirname, {
            electron: require(path.join(__dirname, '/../node_modules/electron')),
        });
        win.loadURL('http://localhost:4200');
    } else {
        // 当运行Electron可执行文件时的路径
        let pathIndex = './index.html';

        if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
            // 当在本地文件夹中运行Electron时的路径
            pathIndex = '../dist/index.html';
        }

        win.loadURL(
            url.format({
                pathname: path.join(__dirname, pathIndex),
                protocol: 'file:',
                slashes: true,
            }),
        );
    }

    win.webContents.on('did-finish-load', () => {
        const { parsed } = require('dotenv').config({ path: dotenvPath });
        win.webContents.send('dotenv', parsed);
    });

    // 当窗口关闭时触发。
    win.on('closed', () => {
        // 清除窗口对象引用，通常你会将窗口存储在一个数组中（如果你的应用支持多窗口），这是删除相应元素的时候。
        win = null;
    });

    return win;
}

try {
    // 当Electron完成初始化并准备好创建浏览器窗口时，此方法将被调用。
    // 一些API只能在此事件发生后使用。
    // 添加400毫秒以解决使用透明窗口时的黑色背景问题。更多详情见 https://github.com/electron/electron/issues/15947
    app.on('ready', () => setTimeout(createWindow, 400));

    // 当所有窗口关闭时退出。
    app.on('window-all-closed', () => {
        // 在OS X上，应用程序及其菜单栏通常会保持活动状态，直到用户明确地使用Cmd + Q退出
        if (process.platform !== 'darwin') {
            app.quit();
            child?.kill();
        }
    });

    app.on('activate', () => {
        // 在OS X上，当点击停靠栏图标且没有其他窗口打开时，通常会重新创建一个窗口。
        if (win === null) {
            createWindow();
        }
    });
} catch (e) {
    // 捕获错误
    // throw e;
}

// 开启新进程启动express服务
const documentsPath = app.getPath('documents');
const child = fork(path.join(__dirname, './express.js'), { env: { documentsPath } });

// 创建.env配置文件
const dotenvPath = path.join(documentsPath, 'Electron App', '.env');
if (!fs.existsSync(dotenvPath)) {
    // 如果目录不存在，创建它
    const defaultEnvConfig = `host=http://localhost:4210\n`;
    fs.writeFileSync(dotenvPath, defaultEnvConfig, 'utf8');
}
