import express, { json } from "express";
import fs from "fs/promises";
import bodyParser from "body-parser";
import { Database } from "./database/index.js";
import cors from "cors";
import { create, deleteRow, update } from "./database/orm.js";

Database.init();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000;

app.get("/doctors", async (req, res) => {
  Database.connection.query(
    `SELECT d.*,
      JSON_ARRAYAGG(JSON_OBJECT("id", s.id, "name", s.name)) AS services,   
      sp.name specialtyName
      From doctor d
      join specialty sp on sp.id= d.specialtyId
      join doctor_service ds on d.id = ds.doctorId 
      join service s on s.id= ds.serviceId
      GROUP BY d.id`,
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    },
  );
});

app.get("/specialities", async (req, res) => {
  Database.connection.query(
    "SELECT * from specialty order by name",
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    },
  );
});

app.get("/services", async (req, res) => {
  Database.connection.query(
    "SELECT * from service order by name",
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    },
  );
});

app.get("/clinics", async (req, res) => {
  Database.connection.query(
    "SELECT c.* , s.name specialtyName From clinic c join specialty s on c.specialtyId = s.id order by c.id",
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    },
  );
});

app.post("/clinics/create", async (req, res) => {
  await create(req, res, "clinic", [
    "name",
    "star",
    "specialtyId",
    "happyPatients",
    "allPatients",
    "address",
    "image",
  ]);
});

app.put("/clinics/:id", async (req, res) => {
  await update(req, res, "clinic", [
    "name",
    "star",
    "specialtyId",
    "happyPatients",
    "allPatients",
    "address",
    "image",
  ]);
});

app.delete("/clinics/:id", async (req, res) => {
  await deleteRow(req, res, "clinic");
});

app.post("/doctors/create", async (req, res) => {
  const [name, star, specialtyId, happyPatients, allPatients, address, image] =
    req.body;
  Database.connection.query(
    "insert into " +
      "doctor(name,star,specialtyId,happyPatients,allPatients,address,image) " +
      "values(?,?,?,?,?,?,?)",
    [name, star, specialtyId, happyPatients, allPatients, address, image],
    (err, rows) => {
      if (err) throw err;
      res.send("done");
    },
  );
});

app.put("/doctors/:id", async (req, res) => {
  const [name, star, specialtyId, happyPatients, allPatients, address, image] =
    req.body;
  const id = req.params.id;

  Database.connection.query(
    "UPDATE doctor set " +
      "name=? ,star=?, specialtyId=?, happyPatients=?,allPatients=?,address=?,image=?" +
      " where id= ?",
    [name, star, specialtyId, happyPatients, allPatients, address, image, id],
    (err, rows) => {
      if (err) throw err;
      res.send("done");
    },
  );
});

app.delete("/doctors/:id", async (req, res) => {
  const id = req.params.id;
  Database.connection.query(
    "DELETE FROM doctor where id=? ",
    [id],
    (err, rows) => {
      if (err) throw err;
      res.send("done");
    },
  );
});

app.get("/feedback", async (req, res) => {
  Database.connection.query("SELECT * From feedback", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.post("/feedback/create", async (req, res) => {
  const [name, star, date, image, suggestion, description] = req.body;

  Database.connection.query(
    "insert into " +
      "feedback(name,star,date,image,suggestion,description) " +
      "values(?,?,?,?,?,?)",
    [name, star, date, image, suggestion, description],
    (err, rows) => {
      if (err) throw err;
      res.send("done");
    },
  );
});

app.put("/feedback/:id", async (req, res) => {
  const [name, star, date, image, suggestion, description] = req.body;
  const id = req.params.id;

  Database.connection.query(
    "update feedback " +
      "set name=?,star=? ,date=? ,image=? ,suggestion=? ,description=? " +
      "where id= ?",
    [name, star, date, image, suggestion, description, id],

    (err, rows) => {
      if (err) throw err;
      res.send("done");
    },
  );
});

app.delete("/feedback/:id", async (req, res) => {
  const id = req.params.id;
  Database.connection.query(
    "DELETE FROM feedback WHERE id=?",
    [id],
    (err, rows) => {
      if (err) throw err;
      res.send("done");
    },
  );
});

//consultant
app.get("/consultants", async (req, res) => {
  Database.connection.query(
    "SELECT c.* , s.name specialtyName From consultant c join specialty s on c.specialtyId = s.id order by c.id",
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    },
  );
});

app.post("/consultants/create", async (req, res) => {
  const [name, star, specialtyId, image] = req.body;

  Database.connection.query(
    "insert into " +
      "consultant(name,star,specialtyId,image) " +
      "values(?,?,?,?)",
    [name, star, specialtyId, image],
    (err, rows) => {
      if (err) throw err;
      res.send("done");
    },
  );
});

app.put("/consultants/:id", async (req, res) => {
  const [name, star, specialtyId, image] = req.body;
  const id = req.params.id;

  Database.connection.query(
    "UPDATE consultant set " +
      "name=? ,star=?, specialtyId=?,image=?" +
      " where id= ?",
    [name, star, specialtyId, image, id],
    (err, rows) => {
      if (err) throw err;
      res.send("done");
    },
  );
});

app.delete("/consultants/:id", async (req, res) => {
  const id = req.params.id;
  Database.connection.query(
    "DELETE FROM consultant where id=? ",
    [id],
    (err, rows) => {
      if (err) throw err;
      res.send("done");
    },
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
