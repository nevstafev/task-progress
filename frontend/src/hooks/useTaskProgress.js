import { useInterval } from './useInterval';
import { useState, useEffect } from 'react';

export const useTaskProgress = () => {
  const [status, setStatus] = useState({
    state: 'disconnected',
    actions: [],
    progress: {
      current: 0,
      total: 10,
    },
  });

  async function fetchStatus() {
    const response = await fetch('/api/status');
    const { state, progress, actions } = await response.json();
    console.log(state, progress, actions);
    setStatus({
      state,
      progress,
      actions,
    });
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  useInterval(fetchStatus, status.state === 'inProgress' || status.state === 'cancelling' || status.state === 'finishing' ? 500 : null);

  return {
    status,
    start: async () => {
      await fetch('/api/start');
      await fetchStatus();
    },
    cancel: async () => {
      await fetch('/api/cancel');
      await fetchStatus();
    },
  };
};
