module.exports = (db) => (req, res) => {
    const { kodeCrew, sektor } = req.body;

    if (!kodeCrew) {
        return res.status(400).json({ message: 'kodeCrew is required' });
    }

    const sqlInsertCrew = "INSERT INTO crew (`kodeCrew`, `sektor`) VALUES (?, ?)";
    const values = [kodeCrew, sektor];
    db.query(sqlInsertCrew, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ message: 'Error inside server', error: err.message });
        }
        return res.json(result);
    });
};
