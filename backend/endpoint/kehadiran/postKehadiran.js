module.exports = (db) => (req, res) => {
    const kehadiranData = req.body;

    console.log('Received data:', kehadiranData);

    const sqlCheck = "SELECT * FROM kehadiran WHERE idTeknisi = ? AND date = ?";
    const sqlUpdateKehadiran = "UPDATE kehadiran SET status = ? WHERE idTeknisi = ? AND date = ?";
    const sqlInsertKehadiran = "INSERT INTO kehadiran (idTeknisi, date, status) VALUES (?, ?, ?)";
    const sqlDeleteKehadiran = "DELETE FROM kehadiran WHERE idTeknisi = ? AND date = ?";
    const sqlUpdateCrew = "UPDATE teknisi SET idCrew = ? WHERE id = ?";
    const sqlUpdateKehadiranCrew = "UPDATE kehadiran SET crew = ? WHERE idTeknisi = ?";

    let processedCount = 0;
    const totalItems = kehadiranData.length;
    const errors = [];

    kehadiranData.forEach(item => {
        db.query(sqlCheck, [item.idTeknisi, item.date], (err, data) => {
            if (err) {
                errors.push(err.message);
                checkCompletion();
                return;
            }

            if (data.length > 0) {
                if (item.status === null) {
                    db.query(sqlDeleteKehadiran, [item.idTeknisi, item.date], (err) => {
                        if (err) {
                            errors.push(err.message);
                        }
                        if (item.idCrew) {
                            db.query(sqlUpdateCrew, [item.idCrew, item.idTeknisi], (err) => {
                                if (err) {
                                    errors.push(err.message);
                                }
                                db.query(sqlUpdateKehadiranCrew, [item.idCrew, item.idTeknisi], (err) => {
                                    if (err) {
                                        errors.push(err.message);
                                    }
                                    checkCompletion();
                                });
                            });
                        } else {
                            checkCompletion();
                        }
                    });
                } else {
                    db.query(sqlUpdateKehadiran, [item.status, item.idTeknisi, item.date], (err) => {
                        if (err) {
                            errors.push(err.message);
                        }
                        if (item.idCrew) {
                            db.query(sqlUpdateCrew, [item.idCrew, item.idTeknisi], (err) => {
                                if (err) {
                                    errors.push(err.message);
                                }
                                db.query(sqlUpdateKehadiranCrew, [item.idCrew, item.idTeknisi], (err) => {
                                    if (err) {
                                        errors.push(err.message);
                                    }
                                    checkCompletion();
                                });
                            });
                        } else {
                            checkCompletion();
                        }
                    });
                }
            } else {
                db.query(sqlInsertKehadiran, [item.idTeknisi, item.date, item.status || null], (err) => {
                    if (err) {
                        errors.push(err.message);
                    }
                    if (item.idCrew) {
                        db.query(sqlUpdateCrew, [item.idCrew, item.idTeknisi], (err) => {
                            if (err) {
                                errors.push(err.message);
                            }
                            db.query(sqlUpdateKehadiranCrew, [item.idCrew, item.idTeknisi], (err) => {
                                if (err) {
                                    errors.push(err.message);
                                }
                                checkCompletion();
                            });
                        });
                    } else {
                        checkCompletion();
                    }
                });
            }
        });
    });

    function checkCompletion() {
        processedCount++;
        if (processedCount === totalItems) {
            if (errors.length > 0) {
                return res.status(500).json({ message: 'Some errors occurred', errors });
            }
            return res.json({ message: 'Data processed successfully' });
        }
    }
};
