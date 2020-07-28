const idle = {
  start: () => {
    console.log('Starting task...');
    state.current = inProgress;
  },
  finish: () => {
    throw new Error('Task not started.');
  },
  cancel: () => {
    throw new Error("Idle task can't be canceled.");
  },
  getState() {
    return 'idle';
  },
  getActions() {
    return ['run'];
  },
};

const inProgress = {
  start: () => {
    throw new Error('Task already in progress.');
  },
  finish: () => {
    console.log('Task is finished.');
    state.current = finished;
  },
  cancel: () => {
    console.log('Canceling task...');
    state.current = canceled;
  },
  getState() {
    return 'inProgress';
  },
  getActions() {
    return ['cancel'];
  },
};

const finished = {
  start: () => {
    console.log('Starting task...');
    state.current = inProgress;
  },
  finish: () => {
    throw new Error('Task already finished.');
  },
  cancel: () => {
    throw new Error(" task can't be canceled");
  },
  getState() {
    return 'finished';
  },
  getActions() {
    return ['run'];
  },
};

const canceled = {
  start: () => {
    console.log('Starting task...');
    state.current = inProgress;
  },
  finish: () => {
    throw new Error("Canceled task can't be finished.");
  },
  cancel: () => {
    throw new Error('Task already canceled.');
  },
  getState() {
    return 'canceled';
  },
  getActions() {
    return ['run'];
  },
};

const failed = {
  start: () => {
    state.current = inProgress;
  },
  finish: () => {
    throw new Error("Failed task can't be finished.");
  },
  cancel: () => {
    throw new Error("Failed task can't be canceled.");
  },
  getState() {
    return 'failed';
  },
  getActions() {
    return ['run'];
  },
};

const state = {
  current: idle,
  progress: {
    current: 0,
    total: 10,
  },
  finish() {
    this.current.finish();
  },
  cancel() {
    this.current.cancel();
  },
  start() {
    this.current.start();
  },
  getState() {
    return {
      name: this.current.getState(),
      progress: this.progress,
      actions: this.current.getActions(),
    };
  },
  setProgress(current, total) {
    this.progress.current = current;
    this.progress.total = total;
  },
};

module.exports = state;
