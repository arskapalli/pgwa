const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const port = process.env.port || 5000;

app.listen(port, () => console.log('Listening on port 5000'))

let db = new sqlite3.Database('./pgwa.db', (err) => {
    if (err) {
        console.error(err.message)
    };
    console.log('Connected to PGWA DB');
});

app.get('/img', (req, res) => {
    let id = req.query.id;
    const sql = "SELECT * FROM IMAGE WHERE ID = ?";
    db.get(sql,[id], (err, row) => {
        if(err) {
            return console.error(err.message);
        }
        else {
            res.send({ id: row.ID, label: row.LABEL, desc: row.DESCRIPTION, path: row.PATH })
        }
    });
});