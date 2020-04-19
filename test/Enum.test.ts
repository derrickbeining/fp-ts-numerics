/**
 * These tests depend on Int being a lawful Enum
 */
import fc from 'fast-check'
import { array as A, ord } from 'fp-ts'

import { enumFromTo } from '../src/Enum'
import { Int } from '../src/Int'
import { arbitraryInt } from '../src/Int/Arbitrary'

const arbIntTuple = fc.tuple(arbitraryInt, arbitraryInt)
const arbIntTupleEq = arbIntTuple.filter(([from, to]) => Int.equals(from, to))
const arbIntTupleAsc = arbIntTuple.filter(([from, to]) => ord.lt(Int)(from, to))
const arbIntTupleDesc = arbIntTuple.filter(([from, to]) => ord.gt(Int)(from, to))

describe('Enum', () => {
  describe(enumFromTo.name, () => {
    describe('when from === to', () => {
      it('makes a singleton array', () => {
        fc.assert(
          fc.property(arbIntTupleEq, ([from, to]) => {
            return A.getEq(Int).equals(enumFromTo(Int, A.array)(from, to), [from])
          })
        )
      })
    })

    describe('when to < from', () => {
      it('makes an array of continuous descending Ints', () => {
        fc.assert(
          fc.property(arbIntTupleDesc, ([from, to]) => {
            const { failed } = enumFromTo(Int, A.array)(from, to).reduce(
              (b, next) => {
                if (b.failed) return b
                if (Int.equals(next, Int.sub(b.prev, Int.of(1)))) {
                  return { ...b, prev: next }
                }
                return { ...b, failed: true }
              },
              { failed: false, prev: Int.add(from, Int.of(1)) }
            )
            return !failed
          })
        )
      })
    })

    describe('when to > from', () => {
      it('makes an array of continuous ascending Ints', () => {
        fc.assert(
          fc.property(arbIntTupleAsc, ([from, to]) => {
            const { failed } = enumFromTo(Int, A.array)(from, to).reduce(
              (b, next) => {
                if (b.failed) return b
                if (Int.equals(next, Int.add(b.prev, Int.of(1)))) {
                  return { ...b, prev: next }
                }
                return { ...b, failed: true }
              },
              { failed: false, prev: Int.sub(from, Int.of(1)) }
            )
            return !failed
          })
        )
      })
    })
  })
})
