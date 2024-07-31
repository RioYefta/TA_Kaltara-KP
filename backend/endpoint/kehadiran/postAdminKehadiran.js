module.exports = (db) => (req, res) => {
    const { idTeknisi, date, field, newValue } = req.body;
  
    let sql;
    if (field === 'crew') {
      sql = `UPDATE teknisi SET idCrew = (SELECT id FROM crew WHERE kodeCrew = ?) WHERE id = ?`;
    } else {
      sql = `INSERT INTO kehadiran (idTeknisi, date, status)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE status = ?`;
    }
  
    const params = (field === 'crew') ? [newValue, idTeknisi] : [idTeknisi, date, newValue, newValue];
    
    console.log("Executing query:", sql);
    console.log("With parameters:", params);
    
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ message: 'Error inside server' });
      }
      console.log("Query result:", result);
      return res.json({ message: 'Update successful' });
    });
  };
  