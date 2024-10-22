const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const router = express.Router();

router.get('/', function (req, res, next) {
    res.send({ module: 'download', path: process.cwd() });
});

router.get('/video/:fileName', async (req, res) => {
    const fileName = req.params.fileName;
    const staticPath = path.join(process.cwd(), 'public');
    const filePath = path.join(staticPath, fileName);
    const videoUrl = `http://192.168.0.53/${fileName}`;

    if (fs.existsSync(filePath)) {
        return res.send({ code: 0, message: '文件已存在' });
    }

    const io = req.app.get('socketio'); // 获取 socket.io 实例

    const response = await axios({
        method: 'get',
        url: videoUrl,
        responseType: 'stream', // 接收流数据
        onDownloadProgress: progressEvent => {
            const total = progressEvent.total || 0;
            const loaded = progressEvent.loaded;
            const progress = Math.round((loaded * 100) / total);
            // 实时向前端推送下载进度
            io.emit('progress', progress);
        },
    });

    // 将流数据写入本地文件
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    writer.on('finish', () => {
        io.emit('progress', 100); // 下载完成后发送100%进度
        return res.send({ code: 0, message: '文件已下载' });
    });

    writer.on('error', () => {
        return res.status(500).send('视频下载失败');
    });
});

module.exports = router;
