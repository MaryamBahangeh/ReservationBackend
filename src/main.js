import express, {json} from "express";
import fs from "fs/promises";
import bodyParser from "body-parser";
import mysql from "mysql";
import {Database} from "./database/index.js";

Database.init();

const app = express()
app.use (bodyParser.json());
const port = 5000


app.get('/clinics',async (req, res) => {
    Database.connection.query('SELECT * From clinic', (err, rows) => {
        if (err) throw err
        res.json(rows);
    })
})


app.post('/clinics/create' , async (req, res) => {
    const name = req.body.name;
    const star = req.body.star;
    const specialtyid = req.body.specialtyid;
    const happyPatients = req.body.happyPatients;
    const allPatients = req.body.allPatients;
    const address = req.body.address;
    const image = req.body.image;

    Database.connection.query("insert into " +
        "clinic(name,star,specialtyid,happyPatients,allPatients,address,image) " +
        "values(?,?,?,?,?,?,?)",[name,star,specialtyid,happyPatients,allPatients,address,image]
        , (err, rows) => {
            if(err) throw err
            res.send('done');
        });

})

app.put('/clinics/:id', async (req, res) => {
    const name = req.body.name;
    const star = req.body.star;
    const specialtyid = req.body.specialtyid;
    const happyPatients = req.body.happyPatients;
    const allPatients = req.body.allPatients;
    const address = req.body.address;
    const image = req.body.image;
    const id = req.params.id;

    Database.connection.query("UPDATE clinic set " +
        "name=? ,star=?, specialtyid=?, happyPatients=?,allPatients=?,address=?,image=?" +
        " where id= ?" ,[name,star,specialtyid,happyPatients,allPatients,address,image,id]
        , (err, rows) => {
            if(err) throw err
            res.send('done');
        });

})
app.delete('/clinics/:id' , async (req, res) => {
    const id = req.params.id;
    Database.connection.query("DELETE FROM clinic where id=? " ,[id]
        , (err, rows) => {
            if(err) throw err
            res.send('done');
        });

})



//doctor

app.get('/doctors',async (req, res) => {
    Database.connection.query('SELECT * From doctor', (err, rows) => {
        if (err) throw err
        res.json(rows);
    })
})


app.post('/doctors/create' , async (req, res) => {
    const name = req.body.name;
    const star = req.body.star;
    const specialtyid = req.body.specialtyid;
    const happyPatients = req.body.happyPatients;
    const allPatients = req.body.allPatients;
    const address = req.body.address;
    const image = req.body.image;

    Database.connection.query("insert into " +
        "doctor(name,star,specialtyid,happyPatients,allPatients,address,image) " +
        "values(?,?,?,?,?,?,?)",[name,star,specialtyid,happyPatients,allPatients,address,image]
        , (err, rows) => {
            if(err) throw err
            res.send('done');
        });

})

app.put('/doctors/:id', async (req, res) => {
    const name = req.body.name;
    const star = req.body.star;
    const specialtyid = req.body.specialtyid;
    const happyPatients = req.body.happyPatients;
    const allPatients = req.body.allPatients;
    const address = req.body.address;
    const image = req.body.image;
    const id = req.params.id;

    Database.connection.query("UPDATE doctor set " +
        "name=? ,star=?, specialtyid=?, happyPatients=?,allPatients=?,address=?,image=?" +
        " where id= ?" ,[name,star,specialtyid,happyPatients,allPatients,address,image,id]
        , (err, rows) => {
            if(err) throw err
            res.send('done');
        });

})
app.delete('/doctors/:id' , async (req, res) => {
    const id = req.params.id;
    Database.connection.query("DELETE FROM doctor where id=? " ,[id]
        , (err, rows) => {
            if(err) throw err
            res.send('done');
        });

})


//feedback
app.get('/feedback',async (req, res) => {
    Database.connection.query('SELECT * From feedback', (err, rows) => {
        if (err) throw err
        res.json(rows);
    })
})

app.post('/feedback/create' , async (req, res) => {
    const name = req.body.name;
    const star = req.body.star;
    const date = req.body.date;
    const image = req.body.image;
    const suggestion = req.body.suggestion;
     const description = req.body.description;

    Database.connection.query("insert into " +
        "feedback(name,star,date,image,suggestion,description) " +
        "values(?,?,?,?,?,?)",[name,star,date,image,suggestion,description]
        , (err, rows) => {
            if(err) throw err
            res.send('done');
        });

})

app.put('/feedback/:id', async (req, res) => {
    const name = req.body.name;
    const star = req.body.star;
    const date = req.body.date;
    const image = req.body.image;
    const suggestion = req.body.suggestion;
    const id = req.params.id;
    const description=req.body.description;

    Database.connection.query("update feedback " +
        "set name=?,star=? ,date=? ,image=? ,suggestion=? ,description=? " +
    "where id= ?"
        ,[name,star,date,image,suggestion,description,id]

        , (err, rows) => {
            if(err) throw err
            res.send('done');
        });
} )

app.delete('/feedback/:id' , async (req, res) => {
    const id = req.params.id;
    Database.connection.query("DELETE FROM feedback WHERE id=?", [id], (err, rows) => {
        if(err) throw err;
        res.send('done');
    });
})

//consultant
app.get('/consultants',async (req, res) => {
    Database.connection.query('SELECT * From consultant', (err, rows) => {
        if (err) throw err
        res.json(rows);
    })
})


app.post('/consultants/create' , async (req, res) => {
    const name = req.body.name;
    const star = req.body.star;
    const specialtyid = req.body.specialtyid;
    const image = req.body.image;

    Database.connection.query("insert into " +
        "consultant(name,star,specialtyid,image) " +
        "values(?,?,?,?)",[name,star,specialtyid,image]
        , (err, rows) => {
            if(err) throw err
            res.send('done');
        });

})

app.put('/consultants/:id', async (req, res) => {
    const name = req.body.name;
    const star = req.body.star;
    const specialtyid = req.body.specialtyid;
    const image = req.body.image;
    const id = req.params.id;

    Database.connection.query("UPDATE consultant set " +
        "name=? ,star=?, specialtyid=?,image=?" +
        " where id= ?" ,[name,star,specialtyid,image,id]
        , (err, rows) => {
            if(err) throw err
            res.send('done');
        });

})
app.delete('/consultants/:id' , async (req, res) => {
    const id = req.params.id;
    Database.connection.query("DELETE FROM consultant where id=? " ,[id]
        , (err, rows) => {
            if(err) throw err
            res.send('done');
        });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})