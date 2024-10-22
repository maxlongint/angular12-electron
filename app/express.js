const express = require('express');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send({ message: 'Hello Angular electron!' });
});

server.listen('3000', () => {
    console.log(`Api server running on http://localhost:3000/`);
});
