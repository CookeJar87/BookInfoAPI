import db from '../database.js';
import {directory, resourceNotFoundText} from '../resources/strings.js';

export const getLandingPage = (req, res) => {
  res.send(directory);
}

export const getBooks = (req, res, next) => {
  const sql = "SELECT * FROM books";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    const allbooks = JSON.stringify(rows, null, 2);
    console.log(allbooks);
    res.status(200).send("<pre>" + allbooks + "</pre>");
  });
}

export const getBookById = (req, res, next) => {
  console.log("Trying to get a book by ID");
  const sql = "SELECT * FROM books WHERE id = ?";
  const params = [req.params.id];
  console.log(sql);
  console.log(params);

  db.get(sql, params, (err, row) => {
    if (row == null) {
      res.status(404).json({ "error": "No book with ID " + params });
      return;
    }
    console.log("response " + res.body);
    console.log("errorMSG " + err);
    const bookByID = JSON.stringify(row, null, 2);
    console.log(bookByID);
    //TODO should I replace this with a JSON object?
    res.status(200).send("<pre>" + bookByID + "</pre>");
  });
}

// Default response for any requests not supported.
export const defaultGet = (req, res, next) => {
  res.status(404).send(resourceNotFoundText);
}