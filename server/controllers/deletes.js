import db from "../database.js";

export const deleteBookById = (req, res, next) => {
    const sql = "DELETE FROM books WHERE id = ? ";
    const params = [req.params.id];

    db.run(sql, params, (err, rows) => {
        console.log(rows);
        if (err) {
            res.status(404).json({ "error": err.message });
            return;
        }
        else if(rows != null)
        {
            res.status(404).json({ "error": "No book with ID " + params });
            return;
        }
        res.status(204).json({});
        //Alternative response containing more data, but which is not what the breif asked for.
        //res.status(200).json({
        //    "Number of rows deleted: ": this.changes
        //});
    });
}