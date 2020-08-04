import { test, expect, beforeEach } from '@jest/globals';
import Task from '../../src/task/Task';

let task;

beforeEach(() => {
  task = new Task();
});

test('Create task', () => {
  expect(task.getState()).toEqual('idle');
})

test('Starting', () => {
  task.start();

  expect(task.getState()).toEqual('inProgress');
});

test('Canceling', () => {
  task.start();
  task.cancel();

  expect(task.getState()).toEqual('cancelling');
});

test('Start after cancel', () => {
  task.start();
  task.cancel();
  task.cancel();
  task.start();

  expect(task.getState()).toEqual('inProgress');
});