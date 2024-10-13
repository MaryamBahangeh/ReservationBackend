import mysql from "mysql";

export class Database {
  static connection;

  static init() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "reservation",
    });

    this.connection.connect();
  }

  static destroy() {
    this.connection.end();
  }
}
