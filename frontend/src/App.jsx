import React, { useState } from 'react';
import './App.css';
import Task from './components/Task';
import { createTask, getTasks } from './api';
import { useEffect } from 'react';

function App() {
  const [input, setInput] = useState(10);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const fetched = await getTasks();
    setTasks(fetched);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleButtonClick = async () => {
    await createTask(input);
    fetchTasks();
  };

  return (
    <div className="App">
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleButtonClick}>Create task</button>
      {tasks && tasks.map(({ id }) => <Task taskId={id} key={id} />)}
    </div>
  );
}

export default App;
