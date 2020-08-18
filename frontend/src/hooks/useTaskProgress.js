import { useInterval } from './useInterval';
import { useState, useEffect, useCallback } from 'react';

const longPullStatuses = ['inProgress', 'cancelling', 'finishing'];

export const useTaskProgress = (taskId) => {
  const [status, setStatus] = useState({
    state: 'disconnected',
    actions: [],
    progress: {
      current: 0,
      total: 10,
    },
  });

  const fetchStatus = useCallback(async () => {
    const response = await fetch(`/api/task/${taskId}/status`);
    const { state, progress, actions } = await response.json();

    setStatus({
      state,
      progress,
      actions,
    });
  }, [taskId])

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useInterval(fetchStatus, longPullStatuses.includes(status.state) ? 1000 : null);

  return {
    status,
    start: async () => {
      await fetch(`/api/task/${taskId}/work`, { method: 'post' });
      await fetchStatus();
    },
    cancel: async () => {
      await fetch(`/api/task/${taskId}/work`, { method: 'delete' });
      await fetchStatus();
    },
  };
};
