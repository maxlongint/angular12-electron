const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const downloadRouter = require('./routes/download');

const server = express();
server.use(express.json());
server.use(cors());

// 要检查的目录路径
const staticPath = path.join(process.cwd(), 'public');
// 判断目录是否存在
if (!fs.existsSync(staticPath)) {
    // 如果目录不存在，创建它
    fs.mkdirSync(staticPath, { recursive: true });
}
server.use(express.static(staticPath));

server.get('/', (req, res) => {
    res.send({ title: 'express server is running!', path: process.cwd() });
});

server.use('/download', downloadRouter);

server.listen('3000', () => {
    console.log(`Api server running on http://localhost:3000/`);
});
