// check ;'s where should they be

import express from 'express';
import db from './database.js';

const app = express();
const port = 9000;

app.get('/', (req, res) => {
  res.send("Welcome to the landing page for Sound Tuition's book collection API.")
});

app.get("/api/books", (req, res, next) => {
  const sql = "SELECT * FROM BookInfo";
  const params = [];
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      const allBooks = JSON.stringify(rows, null, 2);
      console.log(allBooks);
      res.status(200).send("<pre>"+ allBooks +"</pre>");
         // "message":"success",
         // "data":rows,  
      });
    });

    app.get("/api/books/:id", (req, res, next) => {
      var sql = "SELECT * FROM BookInfo WHERE id = ?"
      var params = [req.params.id]
      db.get(sql, params, (err, row) => {
          if (err) {
            res.status(400).json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "data":row
          })
        });
  });



app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
})