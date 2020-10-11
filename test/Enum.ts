/**
 * These tests depend on Int being a lawful Enum
 */
import fc, { Arbitrary } from 'fast-check'
import { array as A, ord } from 'fp-ts'

import { Enum, enumFromTo, enumUpFrom } from '../src/Enum'
import { Semiring } from '../src/Semiring'

export function runEnumTestsFor<T>(E: Semiring<T> & Enum<T>, arb: Arbitrary<T>): void {
  const arbTuple = fc.tuple(arb, arb)
  const arbTupleEq = arbTuple.filter(([from, to]) => E.equals(from, to))
  const arbTupleAsc = arbTuple.filter(([from, to]) => ord.lt(E)(from, to))
  const arbTupleDesc = arbTuple.filter(([from, to]) => ord.gt(E)(from, to))

  describe('Enum', () => {
    describe(enumFromTo.name, () => {
      describe('when from === to', () => {
        it('makes a singleton array', () => {
          fc.assert(
            fc.property(arbTupleEq, ([from, to]) => {
              return A.getEq(E).equals(enumFromTo(E, A.array)(from, to), [from])
            })
          )
        })
      })

      describe('when to < from', () => {
        it('makes an array of continuous descending Ints', () => {
          fc.assert(
            fc.property(arbTupleDesc, ([from, to]) => {
              const { failed } = enumFromTo(E, A.array)(from, to).reduce(
                (b, next) => {
                  if (b.failed) return b
                  if (ord.lt(E)(next, b.prev)) {
                    return { ...b, prev: next }
                  }
                  return { ...b, failed: true }
                },
                { failed: false, prev: E.add(from, E.one) }
              )
              return !failed
            })
          )
        })
      })

      describe('when to > from', () => {
        it('makes an array of continuous ascending Ints', () => {
          fc.assert(
            fc.property(arbTupleAsc, ([from, to]) => {
              const { failed } = enumFromTo(E, A.array)(E.add(from, E.one), to).reduce(
                (b, next) => {
                  if (b.failed) return b
                  if (E.equals(next, E.add(b.prev, E.one))) {
                    return { ...b, prev: next }
                  }
                  return { ...b, failed: true }
                },
                { failed: false, prev: from }
              )
              return !failed
            })
          )
        })
      })
    })

    describe(enumUpFrom.name, () => {
      //
    })
  })
}
