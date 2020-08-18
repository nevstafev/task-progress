

export const getTasks = async () => {
  const resp = await fetch('/api/task');
  return resp.json();
};

export const getTask = (id) => fetch(`/api/task/${id}`).json();

export const createTask = async (iterations) => {
  const resp = await fetch('/api/task', {
    method: 'POST',
    body: JSON.stringify({ iterations }),
    headers: { 'Content-Type': 'application/json' }
  });
  return resp.json();
};