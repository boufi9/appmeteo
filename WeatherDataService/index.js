const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 3000;

app.get('/weather', async (req, res) => {
    // Replace with your actual API call
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=6f0fa4c0c234e826add93caed89e2eaa');
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error fetching weather data");
    }
});

app.listen(PORT, () => console.log(`WeatherDataService running on port ${PORT}`));
