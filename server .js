const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// الترجمة
app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;
  res.json({ translatedText: `ترجمة النص: ${text}` });
});

// التصريف
app.post('/conjugate', async (req, res) => {
  const { verb } = req.body;
  res.json({ conjugations: [`${verb}-تصريف1`, `${verb}-تصريف2`] });
});

// التصحيح
app.post('/correct', async (req, res) => {
  const { text } = req.body;
  res.json({ correctedText: `النص المصحح: ${text}` });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
