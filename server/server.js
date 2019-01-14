const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const port = process.env.port || 5000;

const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.json());

function initializeDatabase() {

    const sql = [
        "CREATE TABLE IF NOT EXISTS USER ( ID INTEGER PRIMARY KEY AUTOINCREMENT, USERNAME VARCHAR(20) NOT NULL UNIQUE, PASSWORD VARCHAR(64));",
        "CREATE TABLE IF NOT EXISTS IMAGE ( ID INTEGER PRIMARY KEY AUTOINCREMENT, FILENAME TEXT NOT NULL, LABEL TEXT NOT NULL, DESCRIPTION TEXT, IMAGE BLOB, ANNOTATION TEXT, USERID INT, PATH TEXT, FOREIGN KEY(USERID) REFERENCES USER(ID) );",
        "CREATE TABLE IF NOT EXISTS COMMENT ( ID INTEGER PRIMARY KEY AUTOINCREMENT, BODY TEXT NOT NULL, TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP, USERID INTEGER, IMAGEID INTEGER, FOREIGN KEY(USERID) REFERENCES USER(ID), FOREIGN KEY(IMAGEID) REFERENCES IMAGE(ID) );",
        "CREATE TABLE IF NOT EXISTS ANNOTATION ( ID INTEGER PRIMARY KEY AUTOINCREMENT, BODY TEXT NOT NULL, USERID INTEGER, IMAGEID INTEGER, X REAL, Y REAL, TYPE VARCHAR(20), WIDTH REAL, HEIGHT REAL, SRC VARCHAR(64), FOREIGN KEY(USERID) REFERENCES USER(ID), FOREIGN KEY(IMAGEID) REFERENCES IMAGE(ID) );"
    ];

    let db = new sqlite3.Database('./pgwa.db', (err) => {
        if (err) {
            console.error(err.message)
        };
        console.log('Connected to PGWA DB');
        for (let i = 0, len = sql.length; i < len; i++) {
            db.run(sql[i], (error) => {
                if (error) console.error("Error initializing database: ", error.message);
                else {
                    db.run("INSERT INTO USER(USERNAME) SELECT 'anonymous' WHERE NOT EXISTS(SELECT 1 FROM USER WHERE ID = 1);", (error) => {
                        if (error) console.error("Error initializing database: ", error.message);
                    });
                }
            });
        };
    });

    return db;
};

db = initializeDatabase();

app.listen(port, () => console.log('Listening on port 5000'))

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
                $LABEL: req.body.label,
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
                    res.send({success:true, image:id});
                }
            });
        }
    });

});


app.post("/login", (req, res)=>{
    if(req.cookies && req.cookies.userid)
    {
        res.send({success:false});
        return;
    }

    const sql = "SELECT ID FROM USER WHERE USERNAME=$username AND PASSWORD=$password";
    const data = {$username: req.body.username, $password: req.body.password};

    db.all(sql, data, (error, rows) => {
        if( !error )
            if(rows.length)
            {
                res.cookie("userid", rows[0].ID);
                res.send({success:true});
                return;
            }

        res.send({success:false});
    });
});

app.post("/register", (req, res)=>{
    const sql = "INSERT INTO USER(USERNAME, PASSWORD) VALUES($username, $password);";
    const data = {$username: req.body.username, $password: req.body.password};

    db.run(sql, data, function(error) {
        if( !error )
        {
            res.cookie("userid", this.lastID);
            res.send({success:true});
        }
        else
        {
            console.log("Error:", error);
            res.send({success:false});
        }
    });
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
    const sql = "SELECT COMMENT.ID, COMMENT.BODY, COMMENT.TIMESTAMP, USER.USERNAME FROM COMMENT LEFT JOIN USER on USER.ID = COMMENT.USERID WHERE COMMENT.IMAGEID = $IMAGEID;";
    db.all(sql, data, (error, comments) => {
        if (error) {
            console.log("Error retrieving comments: ", error.message);
        } else {
            res.send({comments});
        }
    });
});

app.post("/annotation", (req,res) => {
    const data = {
        $IMAGEID: req.body[2].split('/').pop(),
        $X: JSON.parse(req.body[1])[0].geometry.x,
        $Y: JSON.parse(req.body[1])[0].geometry.y,
        $WIDTH: JSON.parse(req.body[1])[0].geometry.width,
        $HEIGHT: JSON.parse(req.body[1])[0].geometry.height,
        $TYPE: JSON.parse(req.body[1])[0].type,
        $SRC: req.body[3],
        $TEXT: req.body[0]
    }
    console.log(data);
    const sql = "INSERT INTO ANNOTATION(IMAGEID,X,Y,TYPE,BODY,WIDTH,HEIGHT,SRC) VALUES($IMAGEID,$X,$Y,$TYPE,$TEXT,$WIDTH,$HEIGHT,$SRC);"
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
    const sql = "SELECT ID, BODY, X, Y, WIDTH, HEIGHT, TYPE, SRC FROM ANNOTATION WHERE IMAGEID = $IMAGEID;";
    db.all(sql, data, (error, annotations) => {
        if (error) {
            console.log("Error retrieving annotations: ", error.message);
        } else {
            res.send({annotations});
        }
    });
});
