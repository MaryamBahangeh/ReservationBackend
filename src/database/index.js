import mysql from "mysql2";
export class Database {
  static connection;
  static init() {
    this.connection = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    this.connection.connect();
  }

  static destroy() {
    this.connection.end();
  }
}
