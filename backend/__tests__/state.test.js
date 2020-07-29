import { test, expect } from '@jest/globals';
import state from '../src/state';

test('Idle state', () => {
  expect(state.getState().name).toEqual('idle');
});
