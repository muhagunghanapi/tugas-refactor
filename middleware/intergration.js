const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'rahasiasecure';

const verifyToken = (req, res, next) => {
    const header = req.header('Authorization');
    const token = header ? header.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak, token tidak ada.'});
    }
    try {
        const decoded = jwt.verify(token,secretKey);
        req.user = decoded;
        next();
    } catch (error){
        return res.status(401).json({ message: 'Token tidak valid.'});
    }
};

app.get('/secure-endpoint', verifyToken, (req, res) => {
    res.json({ message: 'Akses diberikan.'});
});

app.listen(3000,() => {
    console.log('Server berjalan di port 3000')
});