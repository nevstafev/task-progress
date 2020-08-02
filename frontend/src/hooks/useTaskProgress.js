import { useInterval } from './useInterval';
import { useState, useEffect } from 'react';

export const useTaskProgress = () => {
  const [status, setStatus] = useState({
    name: 'disconnected',
    actions: [],
    progress: {
      current: 0,
      total: 10,
    },
  });

  async function fetchStatus() {
    const response = await fetch('/api/status');
    const { name, progress, actions } = await response.json();
    console.log(name, progress, actions);
    setStatus({
      name,
      progress,
      actions,
    });
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  useInterval(fetchStatus, status.name === 'inProgress' || status.name === 'cancelling' ? 1000 : null);

  return {
    status,
    run: async () => {
      fetch('/api/start');
      fetchStatus();
    },
    cancel:  async () => {
      fetch('/api/cancel');
      fetchStatus();
    },
  };
};
