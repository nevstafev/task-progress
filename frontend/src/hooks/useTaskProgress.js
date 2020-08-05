import { useInterval } from './useInterval';
import { useState, useEffect } from 'react';

const longPullStatuses = ['inProgress', 'cancelling', 'finishing', 'disconnected'];

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

    setStatus({
      state,
      progress,
      actions,
    });
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  useInterval(fetchStatus, longPullStatuses.includes(status.state) ? 1000 : null);

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
