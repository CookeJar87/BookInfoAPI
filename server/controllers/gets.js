import db from '../database.js';

export const getLandingPage = (req, res) => {
  res.send(`<pre>
  Welcome to the landing page for Sound Tuition's book collection API
  
  localhost:9000/ = home,
  localhost:9000/books = all books,
  localhost:9000/books/id = get book by id,
  </pre>`);
}

export const getBooks = (req, res, next) => {
  const sql = "SELECT * FROM BookInfo";
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
  const sql = "SELECT * FROM BookInfo WHERE id = ?";
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
    res.status(200).send("<pre>" + bookByID + "</pre>");
  });
}