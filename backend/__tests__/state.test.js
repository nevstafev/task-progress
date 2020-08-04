import { test, expect, beforeEach } from '@jest/globals';
import state from '../src/state';

let instance;

beforeEach(() => {
  instance = state();
});

test('Idle state', () => {
  expect(instance.getState().name).toEqual('idle');
});

test('Starting', () => {
  instance.start();

  expect(instance.getState().name).toEqual('inProgress');
});

test('Canceling', () => {
  instance.start();
  instance.cancel();

  expect(instance.getState().name).toEqual('cancelling');
});

test('Start after cancel', () => {
  instance.start();
  instance.cancel();
  instance.cancel();
  instance.start();

  expect(instance.getState().name).toEqual('inProgress');
});
