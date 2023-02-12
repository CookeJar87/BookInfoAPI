var sqlite3 = require('sqlite3').verbose()
import md5 from 'md5';

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL, 
            author TEXT NOT NULL, 
            year INTEGER NOT NULL, 
            publisher TEXT
            description TEXT,
            
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO books (title, author, year) VALUES (?,?,?)'
                db.run(insert, ["Meet The Music Notes","Pete Cooke", 2020])
                db.run(insert, ["The Music Notes Sing ABC","Pete Cooke", 2022])
            }
        });  
    }
});


export default db