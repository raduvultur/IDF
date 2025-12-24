require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'f48c70fccc8a459e67a2115f8624cba4ee9e50320f9ad089d3564d44'; // In a real app, use env vars

app.use(cors());
app.use(express.json());

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://data.iledefrance-mobilites.fr/api/explore/v2.1/catalog/datasets/actualites_locales_idfm/records', {
      headers: {
        'Authorization': `Apikey ${API_KEY}`
      },
      params: {
        limit: 20,
        order_by: 'article_first_publication_date desc'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/api/toilets', async (req, res) => {
  try {
    const response = await axios.get('https://data.iledefrance-mobilites.fr/api/explore/v2.1/catalog/datasets/sanitaires-reseau-ratp/records', {
      headers: {
        'Authorization': `Apikey ${API_KEY}`
      },
      params: {
        limit: 50
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch toilets' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
