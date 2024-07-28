const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const serverUrl = 'http://localhost:8081/kehadiran'; // Adjust if your server runs on a different URL or port

// Command usage instructions
const usageInstructions = `
Berikut adalah perintah yang dapat Anda gunakan:
/Tarakan - Dapatkan data kehadiran hari ini untuk sektor Tarakan
/TanjungSelor - Dapatkan data kehadiran hari ini untuk sektor Tanjung Selor
/TanjungRedeb - Dapatkan data kehadiran hari ini untuk sektor Tanjung Redeb
/Malinau - Dapatkan data kehadiran hari ini untuk sektor Malinau
/Nunukan - Dapatkan data kehadiran hari ini untuk sektor Nunukan
`;

// Send usage instructions when the bot starts
bot.onText(/\/start/, (msg) => {
    console.log('Received /start command');
    bot.sendMessage(msg.chat.id, usageInstructions);
});

// Function to fetch and send attendance data
const sendAttendanceData = (chatId, sektor) => {
    console.log(`Fetching attendance data for sektor: ${sektor}`);
    const today = new Date().toISOString().split('T')[0];
    axios.get(`${serverUrl}/${sektor}/${today}`)
        .then(response => {
            const data = response.data;
            console.log('Data received from server:', data); 
            const filteredData = data.filter(item => !['OFF', 'SAKIT', 'IZIN', 'CUTI'].includes(item.status));
            console.log('Filtered data (excluding OFF, SAKIT, IZIN, CUTI status):', filteredData); // Log filtered data

            if (data.length > 0 && filteredData.length === 0) {
                bot.sendMessage(chatId, `Tidak ada yang hadir hari ini di sektor ${sektor}.`);
            } else if (filteredData.length === 0) {
                bot.sendMessage(chatId, `No attendance data found for ${sektor} today.`);
            } else {
                let message = `🛠️ TEKNISI YANG HADIR HARI INI\n\n📅 ${today}\n\n📍 Sektor: ${sektor}\n\n`;
                message += '| Nama Teknisi | Crew | Sektor | Status |\n';
                message += '|----------------------|---------|-----------|------------|\n';
                filteredData.forEach(item => {
                    let statusIcon = item.status === 'PAGI' ? '🌄' : item.status === 'SIANG' ? '🌅' : '🌃';
                    message += `| ${item.namaTeknisi} | ${item.crew} | ${item.sektor} | ${statusIcon} ${item.status} |\n`;
                });
                
                bot.sendMessage(chatId, message);
            }
        })
        .catch(error => {
            console.error('Error fetching attendance data:', error);
            bot.sendMessage(chatId, 'Error fetching attendance data.');
        });
};

// Command handlers for each sector
bot.onText(/\/Tarakan/, (msg) => {
    console.log('Received /Tarakan command');
    sendAttendanceData(msg.chat.id, 'Tarakan');
});
bot.onText(/\/TanjungSelor/, (msg) => {
    console.log('Received /TanjungSelor command');
    sendAttendanceData(msg.chat.id, 'Tanjung Selor');
});
bot.onText(/\/TanjungRedeb/, (msg) => {
    console.log('Received /TanjungRedeb command');
    sendAttendanceData(msg.chat.id, 'Tanjung Redeb');
});
bot.onText(/\/Malinau/, (msg) => {
    console.log('Received /Malinau command');
    sendAttendanceData(msg.chat.id, 'Malinau');
});
bot.onText(/\/Nunukan/, (msg) => {
    console.log('Received /Nunukan command');
    sendAttendanceData(msg.chat.id, 'Nunukan');
});

module.exports = { bot, sendAttendanceData };