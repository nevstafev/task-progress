export default class BaseState {
  name = '';

  constructor(task) {
    this.task = task;
  }
  getName() {
    return this.name;
  }
  getActions() {
    return [];
  }
  next(stateName) {
    this.task.setState(stateName);
  }
  
  start() { }
  finish() { }
  cancel() { }
}