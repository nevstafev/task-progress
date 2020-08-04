import Cancelled from './states/Cancelled.js';
import Cancelling from './states/Cancelling.js';
import Finished from './states/Finished.js';
import Finishing from './states/Finishing.js';
import Idle from './states/Idle.js';
import InProgress from './states/InProgress.js';


export default class Task {
  states = {
    Cancelled,
    Cancelling,
    Finished,
    Finishing,
    Idle,
    InProgress
  };

  constructor() {
    this.state = new Idle(this);
  }

  setState(stateName) {
    const className = stateName[0].toUpperCase() + stateName.slice(1);
    const stateClass = this.states[className];
    this.state = new stateClass(this);
  }

  finish() {
    this.state.finish();
  }
  cancel() {
    this.state.cancel();
  }
  start() {
    this.state.start();
  }
  getState() {
    return this.state.getName();
  }

  getActions() {
    return this.state.getActions();
  }
}
