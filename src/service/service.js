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

export {buildTick, yearToPosition, positionToYear, yearInPixel}
