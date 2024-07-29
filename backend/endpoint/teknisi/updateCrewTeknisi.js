module.exports = (db) => (req, res) => {
    const { id, crew } = req.body;
    const query = 'UPDATE teknisi SET idCrew = ? WHERE id = ?';
    db.query(query, [crew, id], (error, results) => {
        if (error) {
            console.error('Error updating crew:', error);
            return res.status(500).json({ error: 'Error updating crew' });
        }
        res.status(200).json({ message: 'Crew updated successfully' });
    });
};
