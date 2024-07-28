module.exports = (db) => (req, res) => {
    const { nama, sektor, idCrew } = req.body;

    // Insert the technician into the database
    const sqlInsertTeknisi = "INSERT INTO teknisi (`nama`, `sektor`, `idCrew`) VALUES (?, ?, ?)";
    const values = [nama, sektor, idCrew];

    db.query(sqlInsertTeknisi, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ message: 'Error inside server', error: err.message });
        }
        return res.json(result);
    });
};
