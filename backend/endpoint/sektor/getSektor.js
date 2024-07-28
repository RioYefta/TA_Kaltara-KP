module.exports = (db) => (req, res) => {
    const sql = "SELECT * FROM sektor";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error inside server', error: err.message });
        return res.json(data);
    });
};
