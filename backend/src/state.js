export default () => {
  const idle = {
    start: () => {
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
      state.current = finished;
    },
    cancel: () => {
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
      console.log('Finishing task...');
      this.current.finish();
    },
    cancel() {
      console.log('Canceling task...');
      this.current.cancel();
    },
    start() {
      console.log('Starting task...');
      this.current.start();
    },
    getState() {
      console.log('Retrieving state info...')
      const stateInfo = {
        name: this.current.getState(),
        progress: this.progress,
        actions: this.current.getActions(),
      };
      console.log(stateInfo);
      return stateInfo;
    },
    setProgress(current, total) {
      this.progress.current = current;
      this.progress.total = total;
    },
  };

  return state;
};
