import {
  collide,
  translateToRight,
  translationToRight,
  uncollide
} from "./2dService";

test('collide Middle', () => {
  // GIVEN
  const rect1 = {x: 5, y: 5, width: 50, height: 50}
  const rect2 = {x: 20, y: 10, width: 10, height: 10}

  // WHEN
  const res = collide(rect1, rect2)

  // THEN
  expect(res).toBeTruthy();
});

test('not collide Under', () => {
  // GIVEN
  const rect1 = {x: 5, y: 5, width: 50, height: 50}
  const rect2 = {x: 20, y: 60, width: 10, height: 10}

  // WHEN
  const res = collide(rect1, rect2)

  // THEN
  expect(res).toBeFalsy();
});

test('not collide Above', () => {
  // GIVEN
  const rect1 = {x: 5, y: 50, width: 50, height: 50}
  const rect2 = {x: 20, y: 5, width: 10, height: 10}

  // WHEN
  const res = collide(rect1, rect2)

  // THEN
  expect(res).toBeFalsy();
});

test('moveToRight Middle', () => {
  // GIVEN
  const rect1 = {x: 5, y: 5, width: 50, height: 50}
  const rect2 = {x: 20, y: 10, width: 10, height: 10}

  // WHEN
  const res = translationToRight(rect1, rect2)

  // THEN
  expect(res).toEqual(35);
});

test('moveToRight and No collide', () => {
  // GIVEN
  const rect1 = {x: 5, y: 5, width: 50, height: 50}
  const rect2 = {x: 20, y: 10, width: 10, height: 10}

  // WHEN
  const before = collide(rect1, rect2)
  const rect3 = translateToRight(rect1, rect2)
  const after = collide(rect1, rect3)

  // THEN
  expect(before).toBeTruthy();
  expect(rect3.x).toEqual(55);
  expect(after).toBeFalsy();
});

test('uncollide simple', () => {
  // GIVEN
  const rect1 = {x: 5, y: 5, width: 50, height: 50}
  const rect2 = {x: 20, y: 10, width: 10, height: 10}

  // WHEN
  const res = uncollide([rect1, rect2])

  // THEN
  const rect3 = {x: 55, y: 10, width: 10, height: 10}
  expect(res).toHaveLength(2)
  expect(res[0]).toEqual(rect1)
  expect(res[1]).toEqual(rect3)
});