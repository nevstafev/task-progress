import state from './state.js';

export default () => {
  const task = state();
  return {
    getStatus() {
      return task.getState();
    },
    start(iterations = 10) {
      task.start();
      task.setProgress(0, iterations);
      let currentIterations = 0;
      const interval = setInterval(() => {
        if (task.getState().name === 'canceled') {
          clearInterval(interval);
          return;
        }
        currentIterations += 1;
        task.setProgress(currentIterations, iterations);
        if (currentIterations === iterations) {
          clearInterval(interval);
          task.finish();
          return;
        }
      }, 1000);
    },
    cancel() {
      task.cancel();
    }
  };
  
};