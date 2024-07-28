module.exports = (db) => (req, res) => {
    const teknisiId = req.params.id;
    const sql = `
        SELECT 
            t.id,
            t.nama,
            c.kodeCrew AS crew,
            s.namaSektor AS sektor
        FROM 
            teknisi t
        LEFT JOIN 
            sektor s ON t.sektor = s.id
        LEFT JOIN
            crew c ON t.idCrew = c.id
        WHERE t.id = ?
    `;
    db.query(sql, [teknisiId], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error inside server', error: err.message });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'Teknisi not found' });
        }
        return res.json(data[0]);
    });
};
