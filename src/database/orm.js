import { Database } from "./index.js";
import req from "express/lib/request.js";

export async function create(req, res, table, columns) {
  const values = columns.map((column) => req.body[column]);
  const statement = `insert into ${table} (${columns.join(",")}) values(${columns.map(() => "?")}) `;
  const callback = (err, rows) => {
    if (err) throw err;
    res.send("done");
  };
  Database.connection.query(statement, values, callback);
}

export async function update(req, res, table, columns) {
  const values = columns.map((column) => req.body[column]);
  const statement = `update ${table} set ${columns.map((column) => column + "=?")} where id= ${req.params.id}`;
  const callback = (err, rows) => {
    if (err) throw err;
    res.send("done");
  };
  Database.connection.query(statement, values, callback);
}

export async function deleteRow(req, res, table) {
  const id = req.params.id;
  const statement = `delete from ${table} where id =?`;
  const callback = (err, rows) => {
    if (err) throw err;
    res.send("done");
  };
  Database.connection.query(statement, id, callback);
}
