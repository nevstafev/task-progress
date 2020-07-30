import express from 'express';
import cors from 'cors';
import timeChangedProcess from './timeChangedProcess.js';

const app = express();

app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

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

export default app;
