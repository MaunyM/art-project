const date = new Date();

function buildTick(start, end = date.getFullYear(), step = 100) {
  if (!step) {
    return []
  }
  const length = Math.floor((end - start) / step)
  if (length < 0) {
    return []
  }
  const ticks = Array.from(Array(length + 1),
      (v, i) => start + (i * step))
  return ticks.includes(end) ? ticks : [...ticks, end];
}

const yearToPosition = (year, conf) =>
    Math.round((year - conf.startYear) * yearInPixel(conf));

function yearInPixel(conf) {
  const durationInYear = conf.endYear - conf.startYear;
  return (conf.height - 2 * conf.padding) / durationInYear;
}

const positionToYear = (position, conf) =>
    Math.round((position / yearInPixel(conf)) + conf.startYear);

function isTooNear(elem, list, margin) {
  return list.some(e => Math.abs(e - elem) <= margin)
}

function oneIsTooNear(a, b, margin) {
  return  Math.abs(a - b) <= margin
}

const filterTooNear =
    (a, b, margin) => a.filter(e => !isTooNear(e, b, margin))

const filterItemsTooNear =
    (a, b, margin) => a.filter(e => !oneIsTooNear(e.year, b.year, margin))

export {buildTick, yearToPosition, positionToYear, yearInPixel, isTooNear, filterTooNear, filterItemsTooNear}
