import db from '../database.js';

export const postBook = (req, res, next) => {
    const errors = [];
    console.log('Tryng to post and entry.');
  
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
    //TODO reject if entry already exists...
    //use absolute equals === and compare the whole object? Thinking out loud.
  
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
    };
  
    const sql = "INSERT INTO BookInfo (title, author, year, publisher, description) VALUES (?,?,?,?,?)";
    const params = [data.title, data.author, data.year, data.publisher, data.description];
  
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        "message": "success",
        "data": data,
        "id": this.lastID
      });
    });
  }


  