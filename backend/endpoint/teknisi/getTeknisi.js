module.exports = (db) => (req, res) => {
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
    `;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error inside server', error: err.message });
        return res.json(data);
    });
};
