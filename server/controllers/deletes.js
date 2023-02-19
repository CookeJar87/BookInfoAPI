import db from "../database.js";

export const deleteBookById = (req, res, next) => {
    console.log("Trying to delete.");
    const sql = "DELETE FROM books WHERE id = ? ";
    const params = [req.params.id];

    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(404).json({ "error": err.message });
            return;
        }
        res.status(204).json({});
        //Alternative response containing more data, but which is not what the breif asked for.
        //res.status(200).json({
        //    "Number of rows deleted: ": this.changes
        //});
    });
}