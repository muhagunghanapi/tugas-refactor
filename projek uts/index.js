const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/datasantri', (req, res) => {
    const { nama, nim, jurusan, alamat, tanggalLahir } = req.body;
    const query = 'INSERT INTO datasantri (nama, nim, jurusan, alamat, tanggalLahir) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [nama, nim, jurusan, alamat, tanggalLahir], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } 
        res.status(201).json({ id: result.insertId, nama, nim, jurusan, alamat, tanggalLahir });
        });
    });


app.get('/datasantri', (req, res) => {
    const query = 'SELECT * FROM datasantri';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
        });
    });


app.get('/datasantri/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM datasantri WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'datasantri not found' });
        }
            res.json(results[0]);
        });
    });


app.put('/datasantri/:id', (req, res) => {
    const { id } = req.params;
    const { nama, nim, jurusan, alamat, tanggalLahir } = req.body;
    const query = 'UPDATE datasantri SET nama = ?, nim = ?, jurusan = ?, alamat = ?, tanggalLahir = ? WHERE id = ?';

    db.query(query, [nama, nim, jurusan, alamat, tanggalLahir, id], (err, result) => {
        if (err) {
           return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'datasantri not found' });
        }
        res.json({id, nama, nim, jurusan, alamat, tanggalLahir });
        });
    });


app.delete('/datasantri/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM datasantri WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'datasantri not found' });
        }
        res.json({ message: 'datasantri deleted' });
        });
    });


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
