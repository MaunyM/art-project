import React from 'react';
import {buildTick, positionToYear, yearToPosition} from "./service";

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

test('convert Year to position start', () => {
  // GIVEN
  const conf = {
    padding: 10,
    height: 2000,
    startYear: 1400,
    endYear: new Date().getFullYear()
  }
  // WHEN
  const res = yearToPosition(1400, conf);

  // THEN
  expect(res).toEqual(0);
});

test('convert Year to position end', () => {
  // GIVEN
  const conf = {
    padding: 10,
    height: 2000,
    startYear: 1400,
    endYear: new Date().getFullYear()
  }
  // WHEN
  const res = yearToPosition(conf.endYear, conf);

  // THEN
  expect(res).toEqual(2000 - 10 - 10);
});

test('convert Year to position middle', () => {
  // GIVEN
  const conf = {
    padding: 10,
    height: 2000,
    startYear: 1400,
    endYear: new Date().getFullYear()
  }
  // WHEN
  const res = yearToPosition(1710, conf);

  // THEN
  expect(res).toEqual((2000 - 10 - 10) / 2);
});

test('convert Year to position 1600', () => {
  // GIVEN
  const conf = {
    padding: 10,
    height: 2000,
    startYear: 1400,
    endYear: new Date().getFullYear()
  }
  // WHEN
  const res = yearToPosition(1600, conf);

  // THEN
  expect(res).toEqual(639);
});

test('convert position to Year start', () => {
  // GIVEN
  const conf = {
    padding: 10,
    height: 2000,
    startYear: 1400,
    endYear: new Date().getFullYear()
  }
  // WHEN
  const res = positionToYear(0, conf);

  // THEN
  expect(res).toEqual(1400);
});

test('convert position to Year end', () => {
  // GIVEN
  const conf = {
    padding: 10,
    height: 2000,
    startYear: 1400,
    endYear: new Date().getFullYear()
  }
  // WHEN
  const res = positionToYear(2000 - 10 - 10, conf);

  // THEN
  expect(res).toEqual(new Date().getFullYear());
});

test('convert position to Year middle', () => {
  // GIVEN
  const conf = {
    padding: 10,
    height: 2000,
    startYear: 1400,
    endYear: new Date().getFullYear()
  }
  // WHEN
  const res = positionToYear((2000 - 10 - 10) / 2, conf);

  // THEN
  expect(res).toEqual(1710);
});

test('convert position to Year 1600', () => {
  // GIVEN
  const conf = {
    padding: 10,
    height: 2000,
    startYear: 1400,
    endYear: new Date().getFullYear()
  }
  // WHEN
  const res = positionToYear(639, conf);

  // THEN
  expect(res).toEqual(1600);
});
