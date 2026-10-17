require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;
const weatherApiKey = process.env.OPENWEATHER_API_KEY;

app.get('/api/weather', async (req, res) => {
  if (!weatherApiKey) {
    return res.status(500).json({ error: 'Weather API key is not configured on the server.' });
  }

  const params = new URLSearchParams({
    lat: '31.7667',
    lon: '35.2667',
    lang: 'en',
    appid: weatherApiKey,
  });

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`);
    const data = await response.json();
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.message || 'Weather service request failed.' });
    }
    return res.json(data);
  } catch (error) {
    console.error('Weather service request failed:', error);
    return res.status(502).json({ error: 'Unable to reach the weather service.' });
  }
});

const buildDirectory = path.join(__dirname, '..', 'build');
app.use(express.static(buildDirectory));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildDirectory, 'index.html'));
});

app.listen(port, () => {
  console.log(`Weather API server listening on http://localhost:${port}`);
});
