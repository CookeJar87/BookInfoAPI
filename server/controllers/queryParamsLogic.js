//Experimental file for possible future development.

import errorCodes from '../resources/errorCodes.js';

const queryParamsLogic = function (req, sql, whereClause, params, errors) {

  if (req.query) { sql += whereClause; }
  if (req.query.author) {
    if (req.query['author'] === "") {
      errors.push(errorCodes.errorCode1);
    }
    else {
      const authorParam = req.query['author'];
      params.push(authorParam);
      const authorClause = 'author = ? '
      sql += authorClause;
    }
  }
  if (req.query.year) {
    if (req.query.year != parseInt(req.query.year, 10)) {
      errors.push(errorCodes.errorCode4);
    }
    else {
      const yearParam = req.query['year'];
      params.push(yearParam);
      if (req.query.author) { sql += "AND " }
      const andYearClause = 'year = ? ';
      sql += andYearClause;
    }
  }
  if (req.query.publisher) {
    if (req.query.publisher == "") {
      errors.push(errorCodes.errorCode1);
    }
    else {
      const publisherParam = req.query['publisher'];
      params.push(publisherParam);
      if (req.query.author || req.query.year) { sql += "AND " }
      const andPublisherClause = 'publisher = ?';
      sql += andPublisherClause;
    }
  }

  if (errors.length) {
    res.status(400).json({ "Error(s)": errors.join(" ") });
    return;
  }
  return sql;

}

export default queryParamsLogic;