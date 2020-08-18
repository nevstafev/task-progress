import express from 'express';
import cors from 'cors';
import { v4 } from 'uuid';
import TimeChangedProcess from './TimeChangedProcess.js';

const app = express();

app.use(cors());
app.use(express.json());

const tasks = {};

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/task', (req, res) => {
  res.json(Object.keys(tasks).map(id => ({ id, ...tasks[id].getStatus() })));
});

app.post('/task', (req, res) => {
  const { iterations } = req.body;
  const task = new TimeChangedProcess(Number(iterations));
  const id = v4();
  tasks[id] = task;
  res.json({ id, ...task.getStatus() });
});

app.get('/task/:id/status', (req, res) => {
  const { id } = req.params;

  const task = tasks[id];
  if (!task) {
    res.status(404).json({ message: `Task[${id}] not found.` });
  } else {
    res.json({ id, ...task.getStatus() });
  }
});

app.delete('/task/:id/work', (req, res) => {
  const { id } = req.params;
  const task = tasks[id];
  if (!task) {
    res.status(404).json({ message: `Task[${id}] not found.` })
    return;
  }
  tasks[id].cancel();
  res.json({ id, ...task.getStatus() });
});

app.post('/task/:id/work', (req, res) => {
  const { id } = req.params;
  const task = tasks[id];
  if (!id || !task) {
    res.status(404).json({ message: `Task[${id}] not found.` })
    return;
  }
  task.start();
  res.json({ id, ...task.getStatus() });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
