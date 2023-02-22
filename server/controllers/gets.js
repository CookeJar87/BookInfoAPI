import db from '../database.js';
import { landingPageMsg, resourceNotFoundMsg } from '../resources/strings.js';
import errorCodes from '../resources/errorCodes.js';

export const getLandingPage = (req, res) => {
  res.send(landingPageMsg);
}

export const getBooks = (req, res, next) => {
  let sql = 'SELECT * FROM books ';
  const whereClause = 'WHERE '
  const params = [];
  const errors = [];

  if (Object.keys(req.query).length !== 0) {sql += whereClause;}
  console.log(req.query);
  console.log(req.query['author']) 
  if (req.query.author) {
    if (req.query['author'] === "") {
      errors.push(errorCodes.errorCode1);
    }
    else {
      const authorParam = req.query['author'];
      params.push(authorParam);
      const authorClause =' author = ? ' 
      sql += authorClause;
    }
  }
  if (req.query.year) {
    if (req.query.year != parseInt(req.query.year, 10)) {
      errors.push(errorCodes.errorCode4);
    }
    else{
      const yearParam = req.query['year'];
      params.push(yearParam);
      if (req.query.author) {sql += "AND " }
      const andYearClause = 'year = ? ';
      sql += andYearClause;
    }
  }
  if (req.query.publisher) {
    if (req.query.publisher == "")
    {
      errors.push(errorCodes.errorCode1);
    }
    else{
      const publisherParam = req.query['publisher'];
      params.push(publisherParam);
      if (req.query.author || req.query.year) {sql += "AND " }
      const andPublisherClause = 'publisher = ?';
      sql += andPublisherClause;
    }
  }
  console.log(sql);

  if (errors.length) {
    res.status(400).json({ "Error(s)": errors.join(" ") });
    return;
  }

  //For a large dataset replace db.all() with db.each()
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    //This solution is just to allow 'pretty' testing using a browser
    //and could be refactored to simply return the json body.  
    const searchResult = JSON.stringify(rows, null, 2);
    res.status(200).send("<pre>" + searchResult + "</pre>");
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
  res.status(404).send(resourceNotFoundMsg);
}