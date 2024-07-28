module.exports = (db) => (req, res) => {
    const { sektor, date } = req.params;
    
    const sql = `
        SELECT 
            k.id,
            k.idTeknisi,
            k.status,
            k.date,
            t.nama AS namaTeknisi,
            c.kodeCrew AS crew,
            s.namaSektor AS sektor
        FROM 
            kehadiran k
        LEFT JOIN 
            teknisi t ON k.idTeknisi = t.id
        LEFT JOIN 
            sektor s ON t.sektor = s.id
        LEFT JOIN
            crew c ON t.idCrew = c.id
        WHERE 
            s.namaSektor = ? AND DATE(k.date) = ?
    `;
    console.log("Executing SQL:", sql);
    db.query(sql, [sektor, date], (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ message: 'Error inside server', error: err.message });
        }
        console.log("Query result:", data);
        return res.json(data);
    });
};