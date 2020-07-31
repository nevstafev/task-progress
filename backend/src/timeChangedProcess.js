import state from './state.js';

const task = state();

const timeChangedProcess = {
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
      if (currentIterations === iterations) {
        clearInterval(interval);
        task.finish();
        return;
      }
      currentIterations += 1;
      task.setProgress(currentIterations, iterations);
    }, 1000);
  },
  cancel() {
    task.cancel();
  }
};

export default timeChangedProcess;