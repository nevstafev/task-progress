const express = require('express');
const cors = require('cors');
const timeChangedProcess = require('./timeChangedProcess');

const app = express();

app.use(cors());

app.get('/start', (req, res) => {
  const { iterations } = req.params;
  timeChangedProcess.start(iterations);
  res.json(timeChangedProcess.getStatus());
});

app.get('/status', (req, res) => {
  res.json(timeChangedProcess.getStatus());
});

app.get('/cancel', (req, res) => {
  timeChangedProcess.cancel();
  res.json(timeChangedProcess.getStatus());
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
