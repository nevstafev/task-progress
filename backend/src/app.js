import express from 'express';
import cors from 'cors';
import TimeChangedProcess from './TimeChangedProcess.js';

const taskProgress = new TimeChangedProcess();

const app = express();

app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/start', (req, res) => {
  const { iterations } = req.params;
  taskProgress.start(iterations);
  res.json(taskProgress.getStatus());
});

app.get('/status', (req, res) => {
  res.json(taskProgress.getStatus());
});

app.get('/cancel', (req, res) => {
  taskProgress.cancel();
  res.json(taskProgress.getStatus());
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
