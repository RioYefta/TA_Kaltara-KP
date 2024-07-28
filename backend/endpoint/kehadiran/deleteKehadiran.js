module.exports = (db) => (req, res) => {
    const { idTeknisi, date } = req.body;

    const sqlDeleteKehadiran = "DELETE FROM kehadiran WHERE idTeknisi = ? AND date = ?";
    db.query(sqlDeleteKehadiran, [idTeknisi, date], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ message: 'Error inside server', error: err.message });
        }
        return res.json({ message: 'Kehadiran entry deleted successfully', result });
    });
};
