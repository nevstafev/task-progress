const state = require('../src/state');

test('Idle state', () => {
  expect(state.getState().name).toEqual('idle');
});