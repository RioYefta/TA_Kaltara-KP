module.exports = (db) => (req, res) => {
    const sql = `
        SELECT 
            t.id AS idTeknisi,
            t.nama AS namaTeknisi, 
            c.kodeCrew AS crew, 
            s.namaSektor AS sektor, 
            k.status, 
            k.date
        FROM 
            teknisi t
        LEFT JOIN 
            sektor s ON t.sektor = s.id
        LEFT JOIN 
            kehadiran k ON t.id = k.idTeknisi
        LEFT JOIN
            crew c ON t.idCrew = c.id
    `;
    console.log("Executing SQL:", sql);
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.json({ message: 'Error inside server' });
        }
        if (data.length === 0) {
            console.log("No data found");
            return res.json({ message: 'No data found' });
        }
        console.log("Query result:", data);
        return res.json(data);
    });
};