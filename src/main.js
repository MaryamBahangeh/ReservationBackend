import express from "express";
import bodyParser from "body-parser";
import fs from "fs/promises";

const app = express();
app.use(bodyParser.json());

const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/clinics", async (req, res) => {
  const content = await fs.readFile("src/data/clinics.json", {
    encoding: "utf-8",
  });

  const clinics = JSON.parse(content);

  res.json(clinics);
});

app.post("/clinics/create", async (req, res) => {
  const content = await fs.readFile("src/data/clinics.json", {
    encoding: "utf-8",
  });

  const clinics = JSON.parse(content);
  clinics.push(req.body);

  await fs.writeFile("src/data/clinics.json", JSON.stringify(clinics, null, 2));

  res.send("done");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
