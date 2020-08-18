import React from 'react';
import { useTaskProgress } from '../hooks/useTaskProgress';
import TextualProgressBar from './TextualProgressBar';

function Task({ taskId }) {
  const {
    status: {
      state,
      progress: { total, current },
      actions,
    },
    start,
    cancel,
  } = useTaskProgress(taskId);

  return (
    <div>
      <p>{state.toUpperCase()}</p>
      <TextualProgressBar total={total} current={current} name={state} />
      {actions.some((action) => action === 'start') && (
        <button onClick={start}>Start</button>
      )}
      {actions.some((action) => action === 'cancel') && (
        <button onClick={cancel}>Cancel</button>
      )}
      {actions.length === 0 && <button disabled>{state}</button>}
    </div>
  );
}

export default Task;