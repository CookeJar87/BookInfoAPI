import db from '../database.js';
import errorCodes from '../resources/errorCodes.js';

export const postBook = (req, res, next) => {
  const errors = [];
  console.log('Tryng to post and entry.');

  if (!req.body.title) {
    errors.push(errorCodes.errorCode1);
  }
  if (!req.body.author) {
    errors.push(errorCodes.errorCode2);
  }
  if (!req.body.year) {
    errors.push(errorCodes.errorCode3);
  }
  if (req.body.year != parseInt(req.body.year, 10)) {
    errors.push(errorCodes.errorCode4);
  }
  if (req.body.publisher == "") {
    errors.push(errorCodes.errorCode5);
  }

  if (errors.length) {
    res.status(400).json({ "error": errors.join(" ") });
    return;
  }

  const data = {
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    publisher: req.body.publisher,
    description: req.body.description
  };

  const sql = "INSERT INTO books (title, author, year, publisher, description) VALUES (?,?,?,?,?)";
  const params = [data.title, data.author, data.year, data.publisher, data.description];

  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json({
      "message": "success",
      "id": this.lastID,
      "data": data
    });
  });
}


