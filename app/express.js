const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { createServer } = require('http');
const { Server } = require('socket.io');
const downloadRouter = require('./routes/download');
const networkRouter = require('./routes/network');

const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
// 将 socket.io 实例挂载到 app 对象上，以便在其他地方访问
app.set('socketio', io);

const { documentsPath } = process.env;
app.set('documentsPath', documentsPath);
const staticPath = path.join(documentsPath, 'Electron App', 'public');
if (!fs.existsSync(staticPath)) {
    // 如果目录不存在，创建它
    fs.mkdirSync(staticPath, { recursive: true });
}
app.use(express.static(staticPath));

// 要检查的目录路径
// const staticPath = path.join(process.cwd(), 'public');
// // 判断目录是否存在
// if (!fs.existsSync(staticPath)) {
//     // 如果目录不存在，创建它
//     fs.mkdirSync(staticPath, { recursive: true });
// }
// app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.send({ title: 'express server is running!', path: process.cwd() });
});

app.use('/download', downloadRouter);
app.use('/network', networkRouter);

// socket.io 在这里使用app.listen(3000)将不起作用，因为它会创建一个新的 HTTP 服务器。
// https://socket.io/zh-CN/docs/v4/server-initialization/#with-express
httpServer.listen('3000', () => {
    console.log(`Api server running on http://localhost:3000/`);
});
