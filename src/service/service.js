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

export {buildTick}
