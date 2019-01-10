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
    const filetype = image.name.split('.').pop();

    db.get("SELECT MAX(ID) AS 'RESULT' FROM IMAGE", [], (error, row) => {
        if (error)
            console.error("Error: ", error.message);
        else {
            const id = row.RESULT ? row.RESULT + 1 : 1;
            const data = {
                $FILENAME: image.name,
                $LABEL: image.name,
                $DESCRIPTION: req.body.description,
                $PATH: "/images/" + id + "." + filetype
            };
            console.log(data);
            db.run(sql, data, (error)=>{
                if(error)
                    console.error("Upload error: ", error.message);
                else
                {
                    console.log("Upload success sike");
                    image.mv("../public/images/" + id + "." + filetype);
                    res.send({success:true});
                }
            });
        }
    });

});


app.post("/login", (req, res)=>{
    console.log("User: '" + req.body.username + "'\nPassword: '" + req.body.password + "'\n");
    res.end();
});


app.post("/comment", (req,res) => {
    const sql = "INSERT INTO COMMENT(IMAGEID,USERID,BODY) VALUES($IMAGEID,$USERID,$BODY);"
    const data = {
        $IMAGEID: req.body.image,
        $USERID: req.body.user,
        $BODY: req.body.comment
    };
    db.run(sql, data, (error) => {
        if (error) {
            console.error("Error posting comment: ", error.message);
        } else {
            res.send({success: true});
        }
    });
});

app.get("/comment", (req,res) => {
    const data = {$IMAGEID: req.query.id};
    const sql = "SELECT ID, BODY FROM COMMENT WHERE IMAGEID = $IMAGEID;";
    db.all(sql, data, (error, rows) => {
        if (error) {
            console.log("Error retrieving comments: ", error.message);
        } else {
            res.send({rows});
        }
    });
});

app.post("/annotation", (req,res) => {
    const sql = "INSERT INTO ANNOTATION(IMAGEID,USERID,BODY) VALUES($IMAGEID,$USERID,$BODY);"
    const data = {
        $IMAGEID: req.body.image,
        $USERID: req.body.user,
        $BODY: req.body.annotation
    };
    db.run(sql, data, (error) => {
        if (error) {
            console.error("Error creating annotation: ", error.message);
        } else {
            res.send({success: true});
        }
    });
});

app.get("/annotation", (req,res) => {
    const data = {$IMAGEID: req.query.id};
    const sql = "SELECT ID, BODY FROM ANNOTATION WHERE IMAGEID = $IMAGEID;";
    db.all(sql, data, (error, rows) => {
        if (error) {
            console.log("Error retrieving annotations: ", error.message);
        } else {
            res.send({rows});
        }
    });
});