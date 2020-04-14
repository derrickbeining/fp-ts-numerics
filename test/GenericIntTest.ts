import * as fc from 'fast-check'
import { option, ord, record } from 'fp-ts'
import * as fptsLaws from 'fp-ts-laws'
import * as A from 'fp-ts/lib/Array'
import { Bounded } from 'fp-ts/lib/Bounded'
import { Ord } from 'fp-ts/lib/Ord'

import * as Enum from '../src/Enum'
import { getEnumLaws } from '../src/Enum/Laws'
import { Integral } from '../src/Integral'
import { Numeric } from '../src/Numeric'

export function runTests<A>(
  name: string,
  GInt: Ord<A> & Bounded<A> & Enum.Enum<A> & Integral<A> & Numeric<A>
) {
  const arbGInt = fc
    .maxSafeInteger()
    .map((n) => GInt.fromNumber(n))
    .filter(option.isSome)
    .map((n) => n.value)

  const arbGIntTuple = fc.tuple(arbGInt, arbGInt)

  const arbGIntTupleEq = arbGIntTuple.filter(([from, to]) => GInt.equals(from, to))
  const arbGIntTupleAsc = arbGIntTuple.filter(([from, to]) => ord.lt(GInt)(from, to))
  const arbGIntTupleDesc = arbGIntTuple.filter(([from, to]) => ord.gt(GInt)(from, to))

  describe(name, () => {
    describe(`Ord<${name}>`, () => {
      describe('Laws', () => {
        it('is lawful', () => {
          fptsLaws.ord(GInt, arbGInt)
        })
      })
    })

    describe(`Bounded<${name}>`, () => {
      describe('Laws', () => {
        test('forall a, bottom is <= a ', () => {
          fc.assert(fc.property(arbGInt, (a) => ord.leq(GInt)(GInt.bottom, a)))
        })
        test('forall a, top is >= a ', () => {
          fc.assert(fc.property(arbGInt, (a) => ord.leq(GInt)(GInt.bottom, a)))
        })
        test('bottom <= top', () => {
          expect(ord.leq(GInt)(GInt.bottom, GInt.top)).toBe(true)
        })
      })
    })

    describe(`Enum<${name}>`, () => {
      describe('Laws', () => {
        const laws = getEnumLaws(GInt, arbGInt)
        record.keys(laws).forEach((law) => {
          test(law, () => fc.assert(laws[law]))
        })
      })

      describe(Enum.enumFromTo.name, () => {
        describe('when from === to', () => {
          it('makes a singleton array', () => {
            fc.assert(
              fc.property(arbGIntTupleEq, ([from, to]) => {
                return A.getEq(GInt).equals(Enum.enumFromTo(GInt, A.array)(from, to), [from])
              })
            )
          })
        })

        describe('when to < from', () => {
          it('makes an array of continuous descending Ints', () => {
            fc.assert(
              fc.property(arbGIntTupleDesc, ([from, to]) => {
                const { failed } = Enum.enumFromTo(GInt, A.array)(from, to).reduce(
                  (b, next) => {
                    if (b.failed) return b
                    if (GInt.equals(next, GInt.sub(b.prev, GInt.one))) {
                      return { ...b, prev: next }
                    }
                    return { ...b, failed: true }
                  },
                  {
                    failed: false,
                    prev: GInt.add(from, GInt.one),
                  }
                )
                return !failed
              })
            )
          })
        })

        describe('when to > from', () => {
          it('Returns a contiguous, ascending sequence of elements from `from` to `to` (inclusive)', () => {
            fc.assert(
              fc.property(arbGIntTupleAsc, ([from, to]) => {
                const { failed } = Enum.enumFromTo(GInt, A.array)(from, to).reduce(
                  (b, next) => {
                    if (b.failed) return b
                    if (GInt.equals(next, GInt.add(b.prev, GInt.one))) {
                      return { ...b, prev: next }
                    }
                    return { ...b, failed: true }
                  },
                  {
                    failed: false,
                    prev: GInt.sub(from, GInt.one),
                  }
                )
                return !failed
              })
            )
          })
        })
      })
    })
  })
}
