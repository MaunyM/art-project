import React from 'react';
import {
  buildTick, filterItemsTooNear, filterItemTooNear,
  filterTooNear,
  isTooNear,
  positionToYear,
  yearToPosition
} from "./yearService";

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

test('isTooNear', () => {
  // GIVEN
  const year = 1502;
  const years = [1400, 1500, 1600];
  // WHEN
  const res = isTooNear(year, years, 2);

  // THEN
  expect(res).toBeTruthy();
});

test('isNotTooNear', () => {
  // GIVEN
  const year = 1504;
  const years = [1400, 1500, 1600];
  // WHEN
  const res = isTooNear(year, years, 2);

  // THEN
  expect(res).toBeFalsy();
});

test('isTooNear empty', () => {
  // GIVEN
  const year = 1502;
  const years = [];
  // WHEN
  const res = isTooNear(year, years, 2);

  // THEN
  expect(res).toBeFalsy();
});

test('filterTooNear One', () => {
  // GIVEN
  const items = [1502];
  const years = [1400, 1500, 1600];
  // WHEN
  const res = filterTooNear(years, items, 2);

  // THEN
  expect(res).toHaveLength(2);
  expect(res).toContain(1400);
  expect(res).toContain(1600);
});

test('filterTooNear None', () => {
  // GIVEN
  const items = [1550];
  const years = [1400, 1500, 1600];
  // WHEN
  const res = filterTooNear(years, items, 2);

  // THEN
  expect(res).toHaveLength(3);
  expect(res).toContain(1400);
  expect(res).toContain(1500);
  expect(res).toContain(1600);
});

test('filterTooNear All', () => {
  // GIVEN
  const items = [1502, 1401, 1602];
  const years = [1400, 1500, 1600];
  // WHEN
  const res = filterTooNear(years, items, 2);

  // THEN
  expect(res).toHaveLength(0);
});

test('filterItemTooNear One', () => {
  // GIVEN
  const item = {year: 1502};
  const years = [{year: 1400}, {year: 1500}, {year: 1600}];
  // WHEN
  const res = filterItemsTooNear(years, item, 2);

  // THEN
  expect(res).toHaveLength(2);
});

test('filterItemsTooNear None', () => {
  // GIVEN
  const item = {year: 1545};
  const years = [{year: 1400}, {year: 1500}, {year: 1600}];
  // WHEN
  const res = filterItemsTooNear(years, item, 2);

  // THEN
  expect(res).toHaveLength(3);
});

