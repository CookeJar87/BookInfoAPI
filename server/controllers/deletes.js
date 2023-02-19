import db from "../database.js";

export const deleteBookById = (req, res, next) => {
    console.log("Trying to delete.");
    const sql = "DELETE FROM BookInfo WHERE id = ? ";
    const params = [req.params.id];

    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(404).json({ "error": err.message });
            return;
        }
        res.status(200).json({
            "Number of rows deleted: ": this.changes
        });
    });
}