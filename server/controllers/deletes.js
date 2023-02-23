import db from "../database.js";

export const deleteBookById = (req, res, next) => {
    const sql = "DELETE FROM books WHERE id = ? ";
    const params = [req.params.id];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(404).json({ "error": err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ "error": "No book with ID " + params });
            return;
        }
        res.status(204).json({});
    });
}