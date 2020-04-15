import zip from 'lodash/zip';
import tail from 'lodash/tail';

const collide = (rect1, rect2) => (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y)

// translation for rect2 not colliding with rect1
const translationToRight = (rect1, rect2) => collide(rect1, rect2) ? (rect1.x
    + rect1.width) - rect2.x : 0

const translateToRight = (rect1, rect2) => ({
  ...rect2, x: rect2.x + translationToRight(rect1, rect2)
})

const uncollide = (rects) => {
  return rects.reduce((acc, rect) => {
    const current = acc[0] ? translateToRight(acc[0], rect) : rect
    return [current, ...acc]
  }, []).reverse()
}

export {collide, translationToRight, translateToRight, uncollide}