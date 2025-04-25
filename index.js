const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

app.get('/grouped-data', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  const grouped = {};

  data.forEach(item => {
    const deviceId = item.device.id;
    if (!grouped[deviceId]) {
      grouped[deviceId] = [];
    }
    grouped[deviceId].push(item);
  });

  res.json(grouped);
});


app.get('/grouped-data/:id', (req, res) => {
  const id = req.params.id;
  const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

  const filtered = data.filter(item => item.device.id === id);

  if (filtered.length === 0) {
    return res.status(404).json({ message: 'Device ID not found' });
  }

  res.json(filtered);
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
