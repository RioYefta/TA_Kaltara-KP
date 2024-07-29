const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const { bot, sendAttendanceData } = require('./telegramBot');
const getTeknisi = require('./endpoint/teknisi/getTeknisi');
const postTeknisi = require('./endpoint/teknisi/postTeknisi');
const updateCrewTeknisi = require('./endpoint/teknisi/updateCrewTeknisi')
const deleteTeknisiByID = require('./endpoint/teknisi/deleteTeknisiByID');
const getSektor = require('./endpoint/sektor/getSektor');
const getKehadiran = require('./endpoint/kehadiran/getKehadiran');
const getAdminKehadiran = require('./endpoint/kehadiran/getAdminKehadiran')
const postAdminKehadiran = require('./endpoint/kehadiran/postAdminKehadiran')
const deleteKehadiran = require('./endpoint/kehadiran/deleteKehadiran');
const getTeknisiID = require('./endpoint/teknisi/getTeknisiID');
const getKehadiranTele = require('./endpoint/kehadiran/getKehadiranTele');
const getCrew = require('./endpoint/crew/getCrew');
const postCrew = require('./endpoint/crew/postCrew');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

app.get('/teknisi', getTeknisi(db));
app.post('/teknisi', postTeknisi(db));
app.delete('/teknisi/:id', deleteTeknisiByID(db));
app.post('/teknisi/updateCrewTeknisi', updateCrewTeknisi(db));
app.get('/sektor', getSektor(db));
app.get('/kehadiran', getKehadiran(db));
app.get('/admin-kehadiran', getAdminKehadiran(db));
app.post('/admin-kehadiran', postAdminKehadiran(db));
app.post('/kehadiran/delete', deleteKehadiran(db));
app.get('/teknisi/:id', getTeknisiID(db));
app.get('/kehadiran/:sektor/:date', getKehadiranTele(db));
app.get('/crew', getCrew(db));
app.post('/crew', postCrew(db));

app.listen(8081, () => {
    console.log("Listening on port 8081");
});