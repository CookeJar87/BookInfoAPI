import sqlite3 from 'sqlite3';

const DBSOURCE = "books.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Error is cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL, 
            author TEXT NOT NULL, 
            year INTEGER NOT NULL, 
            publisher TEXT,
            description TEXT,
            UNIQUE(title, author, year)
             )`,
            (err) => {
                if (err) {
                    // Table already previously created.
                    console.log('Initial book info table already created. ');
                } else {
                    // Table newly created, inserting two initial rows.
                    var insert = 'INSERT INTO books (title, author, year, publisher, description) VALUES (?,?,?,?,?)';
                    db.run(insert, ["Meet The Music Notes", "Pete Cooke", 2020, "Sound Tuition", "Book one in Sound Tuition's series of children's books."]);
                    db.run(insert, ["The Music Notes Sing ABC", "Pete Cooke", 2022, "Sound Tuition", "Book two in Sound Tuition's series of children's books."]);
                    console.log('Database initialised by inserting two entries. ');
                }
            });
    }
});

export default db;