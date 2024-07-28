module.exports = (db) => (req, res) => {
    const teknisiId = req.params.id;
    console.log(`Attempting to delete teknisi with ID: ${teknisiId}`); // Log ID

    const sqlDeleteKehadiran = "DELETE FROM kehadiran WHERE idTeknisi = ?";
    const sqlDeleteTeknisi = "DELETE FROM teknisi WHERE id = ?";
    const sqlGetMaxId = "SELECT MAX(id) AS maxId FROM teknisi";

    db.query(sqlDeleteKehadiran, [teknisiId], (err, result) => {
        if (err) {
            console.error('Error deleting related records in kehadiran:', err); // Log error detail
            return res.status(500).json({ message: 'Error deleting related records', error: err });
        }

        db.query(sqlDeleteTeknisi, [teknisiId], (err, result) => {
            if (err) {
                console.error('Error during deletion:', err); // Log error detail
                return res.status(500).json({ message: 'Error during deletion', error: err });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Teknisi not found' }); // Handle not found
            }

            db.query(sqlGetMaxId, (err, data) => {
                if (err) {
                    console.error('Error fetching max ID:', err); // Log error detail
                    return res.status(500).json({ message: 'Error fetching max ID', error: err });
                }

                const maxId = data[0].maxId || 0;
                const sqlResetAI = `ALTER TABLE teknisi AUTO_INCREMENT = ${maxId + 1}`;

                db.query(sqlResetAI, (err) => {
                    if (err) {
                        console.error('Error resetting AUTO_INCREMENT:', err); // Log error detail
                        return res.status(500).json({ message: 'Error resetting AUTO_INCREMENT', error: err });
                    }
                    return res.json(result);
                });
            });
        });
    });
};
