module.exports = (db) => (req, res) => {
    const { id, crew } = req.body;

    const sqlUpdateCrewTeknisi = "UPDATE teknisi SET idCrew = ? WHERE id = ?";
    const values = [crew, id];

    db.query(sqlUpdateCrewTeknisi, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ message: 'Error inside server', error: err.message });
        }
        return res.json({ message: 'Crew teknisi berhasil diperbarui', result });
    });
};
