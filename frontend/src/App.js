import React, { useState } from 'react';
import './App.css';
import { useTaskProgress } from './hooks/useTaskProgress';
import TextualProgressBar from './components/TextualProgressBar';

function App() {
  const {
    status: {
      state,
      progress: { total, current },
      actions,
    },
    start,
    cancel,
  } = useTaskProgress();
  const [iterations, setIterations] = useState(0);


  return (
    <div className="App">
      <header className="App-header">
        <TextualProgressBar total={total} current={current} name={state} />
        {actions.some((action) => action === 'start') && (
          <button onClick={start}>Start</button>
        )}
        {actions.some((action) => action === 'cancel') && (
          <button onClick={cancel}>Cancel</button>
        )}
        {actions.length === 0 && <button disabled>{state}</button>}
      </header>
    </div>
  );
}

export default App;
