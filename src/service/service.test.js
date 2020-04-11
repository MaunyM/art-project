import React from 'react';
import {buildTick} from "./service";

test('build trick work', () => {
  // WHEN
  const res = buildTick(1400, 2000, 100);

  // THEN
  expect(res.length).toEqual(7);
  expect(res[0]).toEqual(1400);
  expect(res[1]).toEqual(1500);
  expect(res[6]).toEqual(2000);
});

test('build trick work with default value for step', () => {
  // WHEN
  const res = buildTick(1400, 2000);

  // THEN
  expect(res.length).toEqual(7);
  expect(res[0]).toEqual(1400);
  expect(res[1]).toEqual(1500);
  expect(res[6]).toEqual(2000);
});

test('build trick work with default value for end', () => {
  // GIVEN
  const now = new Date();
  // WHEN
  const res = buildTick(1400);

  // THEN
  expect(res.length).toEqual(8);
  expect(res[0]).toEqual(1400);
  expect(res[1]).toEqual(1500);
  expect(res[6]).toEqual(2000);
  expect(res[7]).toEqual(now.getFullYear());
});

test('build trick with wrong start', () => {
  // WHEN
  const res = buildTick(2400, 2000, 100);

  // THEN
  expect(res.length).toEqual(0);
});

test('build trick with step equal to zero', () => {
  // WHEN
  const res = buildTick(1400, 2000, 0);

  // THEN
  expect(res.length).toEqual(0);
});
