import express from "express";
import fs from "fs/promises";

const app = express();
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
