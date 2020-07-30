import React, { useState } from 'react';
import './App.css';
import { useTaskProgress } from './hooks/useTaskProgress';
import TextualProgressBar from './components/TextualProgressBar';

function App() {
  const {
    status: {
      name,
      progress: { total, current },
      actions,
    },
    run,
    cancel,
  } = useTaskProgress();
  const [iterations, setIterations] = useState(0);


  return (
    <div className="App">
      <header className="App-header">
        <TextualProgressBar total={total} current={current} name={name} />
        {actions.some((action) => action === 'run') && (
          <button onClick={run}>Start</button>
        )}
        {actions.some((action) => action === 'cancel') && (
          <button onClick={cancel}>Cancel</button>
        )}
      </header>
    </div>
  );
}

export default App;
