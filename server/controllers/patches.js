import db from '../database.js';

export const patchBookById = (req, res, next) => {

    console.log("Trying to update an entry");
  
    const data = {
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      publisher: req.body.publisher,
      description: req.body.description
    };
  
    db.run(
      `UPDATE books set 
             title = COALESCE(?, title), 
             author = COALESCE(?, author), 
             year = COALESCE(?, year),
             publisher = COALESCE(?, publisher),
             description = COALESCE(?, description)
             WHERE id = ?`,
      [data.title, data.author, data.year, data.publisher, data.description, req.params.id],
      function (err, result) {
        if (err) {
          res.status(400).json({ "error": res.message });
          return;
        }
        res.json({
          message: "success",
          data: data,
          changes: this.changes
        });
      });
  }