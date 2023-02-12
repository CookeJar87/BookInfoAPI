//can I or do I need to keep the verbose
import sqlite3 from 'sqlite3';
import md5 from 'md5';

const DBSOURCE = "Book Collection.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE BookInfo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL, 
            author TEXT NOT NULL, 
            year INTEGER NOT NULL, 
            publisher TEXT,
            description TEXT
             )`,
        (err) => {
            if (err) {
                // Table already created
                console.log ('Initial book info table already created.');
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO BookInfo (title, author, year) VALUES (?,?,?)';
                db.run(insert, ["Meet The Music Notes","Pete Cooke", 2020]);
                db.run(insert, ["The Music Notes Sing ABC","Pete Cooke", 2022]);
                console.log ('Initialised by inserting two entrees');
            }
        });  
    }
});

export default db