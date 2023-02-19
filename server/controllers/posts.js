import db from '../database.js';

export const postBook = (req, res, next) => {
  const errors = [];
  console.log('Tryng to post and entry.');

  if (!req.body.title) {
    errors.push("Error Code 1) No title specified. Please Provide a title.");
  }
  if (!req.body.author) {
    errors.push("Error Code 2) No author specified. Please provide an author.");
  }
  if (!req.body.year) {
    errors.push("Error Code 3) No year specified. Please provide a date, for example, in the format YYYY.");
  }
  if (req.body.year != parseInt(req.body.year, 10)) {
    errors.push("Error Code 4) Year must be a number. Please provide a date, for example, in the format YYYY.");
  }
  if (req.body.publisher == "") {
    errors.push(
      `Error Code 5) If publisher is included it cannot be empty. ` +
      `Please either remove the publisher from your request or fill it in.\
       `);
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
      "data": data,
      "id": this.lastID
    });
  });
}


