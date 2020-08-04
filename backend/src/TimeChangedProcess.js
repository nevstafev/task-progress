import Task from './task/Task.js';

export default class TimeChangedProcess {
  task = new Task();
  progress = { current: 0, total: 10 };
  
  getStatus() {
    return {
      progress: this.progress,
      state: this.task.getState(),
      actions: this.task.getActions()
    }
  }
  
  start(iterations = 10) {
    if (!this.task.getActions().includes('start')) {
      return;
    }
    this.task.start();
    this.progress = { current: 0, total: iterations };
    let currentIterations = 0;
    const interval = setInterval(() => {
      if (this.task.getState() === 'cancelling') {
        clearInterval(interval);
        this.task.cancel();
        return;
      }
      if (this.task.getState() === 'finishing') {
        clearInterval(interval);
        this.task.finish();
        return;
      }
      if (currentIterations === iterations) {
        this.task.finish();
        return;
      }
      currentIterations += 1;
      this.progress = { current: currentIterations, total: this.progress.total };
    }, 1000);
  }
  cancel() {
    this.task.cancel();
  }
};