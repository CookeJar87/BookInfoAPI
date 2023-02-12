// check ;'s where should they be

import express from 'express';
import db from './database.js';

const app = express();
const port = 9000;

app.get('/', (req, res) => {
  res.send("Welcome to the landing page for Sound Tuition's book collection API.");
})

app.get("/api/books", (req, res, next) => {
  var sql = "select * from books"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})