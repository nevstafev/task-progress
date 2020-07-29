import state from './state.js';

const timeChangedProcess = {
  getStatus() {
    return state.getState();
  },
  start(iterations = 10) {
    state.start();
    state.setProgress(0, iterations);
    let currentIterations = 0;
    const interval = setInterval(() => {
      if (state.getState().name === 'canceled') {
        clearInterval(interval);
        return;
      }
      if (currentIterations === iterations) {
        clearInterval(interval);
        state.finish();
        return;
      }
      currentIterations += 1;
      state.setProgress(currentIterations, iterations);
    }, 1000);
  },
  cancel() {
    state.cancel();
  }
};

export default timeChangedProcess;