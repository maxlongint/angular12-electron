const express = require('express');
const ping = require('ping');

const router = express.Router();

router.get('/:host', function (req, res, next) {
    ping.sys.probe(req.params.host, isAlive => {
        if (isAlive) {
            res.send({ code: 0, msg: '网络连接正常' });
        } else {
            res.send({ code: 1, msg: '网络连接异常' });
        }
    });
});

module.exports = router;
