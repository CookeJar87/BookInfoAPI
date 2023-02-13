// check ;'s where should they be

import express from 'express';
import db from './database.js';
import bodyParser from 'body-parser';

const app = express();
const port = 9000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Welcome to the landing page for Sound Tuition's book collection API.")
});

app.get("/api/books", (req, res, next) => {
  const sql = "SELECT * FROM BookInfo";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    const allBooks = JSON.stringify(rows, null, 2);
    console.log(allBooks);
    res.status(200).send("<pre>" + allBooks + "</pre>");
    // "message":"success",
    // "data":rows,  
  });
});

app.get("/api/books/:id", (req, res, next) => {
  var sql = "SELECT * FROM BookInfo WHERE id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": row
    })
  });
});

app.post("/api/books/", (req, res, next) => {
  const errors = [];
  console.log('Tryng to post and entry.');
  console.log(req.body.title);
  console.log(req.body);

  if (!req.body.title) {
    errors.push("No title specified");
  }
  if (!req.body.author) {
    errors.push("No author specified");
  }
  if (!req.body.year) {
    errors.push("No year specified");
  }
  if (req.body.year != parseInt(req.body.year, 10)) {
    errors.push("Year must be number");
  }
  if (errors.length) {
    res.status(400).json({ "error": errors.join(",") });
    return;
  }
  const data = {
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    publisher: req.body.publisher,
    description: req.body.description
  }
  const sql = 'INSERT INTO BookInfo (title, author, year, publisher, description) VALUES (?,?,?,?,?)'
  var params = [data.title, data.author, data.year, data.publisher, data.description]
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message })
      return;
    }
    res.json({
      "message": "success",
      "data": data,
      "id": this.lastID
    })
  });
})



// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});



app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
})