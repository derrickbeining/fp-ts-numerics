import * as fc from 'fast-check'
import { option, ord, record } from 'fp-ts'
import * as fptsLaws from 'fp-ts-laws'
import * as A from 'fp-ts/lib/Array'
import { Bounded } from 'fp-ts/lib/Bounded'
import { Ord } from 'fp-ts/lib/Ord'
import { Show } from 'fp-ts/lib/Show'

import { CommutativeRing } from '../src/CommutativeRing'
import { getCommutativeRingLaws } from '../src/CommutativeRing.Laws'
import * as Enum from '../src/Enum'
import { getEnumLaws } from '../src/Enum.Laws'
import { EuclideanRing } from '../src/EuclideanRing'
import { getEuclideanRingLaws } from '../src/EuclideanRing.Laws'
import { Integral } from '../src/Integral'
import { Numeric } from '../src/Numeric'
import { Ring } from '../src/Ring'
import { getRingLaws } from '../src/Ring.Laws'
import { Semiring } from '../src/Semiring'
import { getSemiringLaws } from '../src/Semiring.Laws'
import { runEnumTestsFor } from './Enum'

export function runTests<A>(
  name: string,
  GInt: Ord<A> &
    Bounded<A> &
    Enum.Enum<A> &
    Integral<A> &
    Numeric<A> &
    Semiring<A> &
    Ring<A> &
    CommutativeRing<A> &
    Show<A> &
    EuclideanRing<A>
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

    describe(`Semiring<${name}>`, () => {
      const laws = getSemiringLaws(GInt, arbGInt)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe(`Ring<${name}>`, () => {
      const laws = getRingLaws(GInt, arbGInt)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe(`CommutativeRing<${name}>`, () => {
      const laws = getCommutativeRingLaws(GInt, arbGInt)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe(`EuclideanRing<${name}>`, () => {
      /**
       * Machine integers violiate some EuclideanRing laws due to
       * certain cases of overflow. For an integer type with N bits,
       * you’ll find that the integral domain law will be violated
       * with any pair of powers of 2 whose exponents add up to at
       * least N. For example 16 * 16 = 2^4 * 2^4 = 0 with Int8.
       *
       * Aside from those cases, the laws hold.
       */
      const arbs = fc.tuple(arbGInt, arbGInt).filter(([a, b]) => {
        const prod = GInt.toNumber(a) * GInt.toNumber(b)
        return prod <= GInt.toNumber(GInt.top) && prod >= GInt.toNumber(GInt.bottom)
      })

      const laws = getEuclideanRingLaws(GInt, arbs)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe(`Show<${name}>`, () => {
      fc.assert(fc.property(arbGInt, (a) => typeof GInt.show(a) === 'string'))
    })

    describe(`Enum<${name}>`, () => {
      describe('Laws', () => {
        const laws = getEnumLaws(GInt, arbGInt)
        record.keys(laws).forEach((law) => {
          test(law, () => fc.assert(laws[law]))
        })

        runEnumTestsFor(GInt, arbGInt)
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
