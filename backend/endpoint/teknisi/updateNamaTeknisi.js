module.exports = (db) => (req, res) => {
    const { id } = req.params;
    const { nama } = req.body;

    const sqlUpdateNamaTeknisi = "UPDATE teknisi SET nama = ? WHERE id = ?";
    const values = [nama, id];

    db.query(sqlUpdateNamaTeknisi, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ message: 'Error inside server', error: err.message });
        }
        return res.json({ message: 'Nama teknisi berhasil diperbarui', result });
    });
};
