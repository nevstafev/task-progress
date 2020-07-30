import { useInterval } from './useInterval';
import { useState, useEffect } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
    const response = await fetch(`${backendUrl}/status`);
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

  useInterval(fetchStatus, status.name === 'inProgress' ? 1000 : null);

  return {
    status,
    run: async () => {
      fetch(`${backendUrl}/start`);
      fetchStatus();
    },
    cancel:  async () => {
      fetch(`${backendUrl}/cancel`);
      fetchStatus();
    },
  };
};
