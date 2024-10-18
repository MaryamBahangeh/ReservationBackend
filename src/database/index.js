import mysql from "mysql";

export class Database {
   static connection;
   static init(){
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'reservation'
        })

        this.connection.connect();
    }

   static destroy()  {
        this.connection.end()
    }

}



