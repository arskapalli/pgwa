const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const port = process.env.port || 5000;

const fileUpload = require('express-fileupload');

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

app.get('/list', (req, res) => {
    const sql = "SELECT ID, PATH FROM IMAGE";
    db.all(sql,[], (err, rows) => {
        if(err) {
            return console.error(err.message);
        }
        else {
            res.send({ rows })
        }
    });
});

app.use(fileUpload());

app.post("/upload", (req, res) =>{
    const sql = "INSERT INTO IMAGE(FILENAME, LABEL, DESCRIPTION, PATH) VALUES($FILENAME, $LABEL, $DESCRIPTION, $PATH);";
    const image = req.files.image;

    const data = {
        $FILENAME: image.name,
        $LABEL: image.name,
        $DESCRIPTION: req.body.description,
        $PATH: "/images/" + image.name,
    };
    db.run(sql, data, (error)=>{
        if(error)
            console.error("Upload error: ", error.message);
        else
        {
            console.log("Upload success sike");
            image.mv("../public/images/" + image.name);
            res.send({success:true});
        }
    });
});
