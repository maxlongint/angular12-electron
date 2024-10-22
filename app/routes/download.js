const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send({ module: 'download', path: process.cwd() });
});

module.exports = router;
