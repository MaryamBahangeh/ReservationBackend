import { Database } from "./index.js";

export async function create(req, res, table, columns) {
  const values = columns.map((column) => req.body[column]);

  const statement = `insert into ${table}(${columns.join(",")}) values(${columns.map(() => "?")})`;

  const callback = (err, rows) => {
    if (err) throw err;
    res.send("done");
  };

  Database.connection.query(statement, values, callback);
}
