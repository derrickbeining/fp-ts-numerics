import * as fc from 'fast-check'
import { option, ord, record } from 'fp-ts'
import * as fptsLaws from 'fp-ts-laws'
import { sequenceT } from 'fp-ts/lib/Apply'
import { pipe } from 'fp-ts/lib/pipeable'

import { getCommutativeRingLaws } from '../src/CommutativeRing/Laws'
import { getEnumLaws } from '../src/Enum/Laws'
import { getEuclideanRingLaws } from '../src/EuclideanRing/Laws'
import { arbitraryInt, Int } from '../src/Int'
import { getArbitraryNonZero } from '../src/NonZero'
import { Ratio } from '../src/Ratio'
import { signum } from '../src/Ring'
import { getRingLaws } from '../src/Ring/Laws'
import { getSemiringLaws } from '../src/Semiring/Laws'

const nonZeroInt = getArbitraryNonZero(Int)(arbitraryInt)

describe('Int', () => {
  describe('Constructors', () => {
    describe(Int.of.name, () => {
      it('constructs an Int from digits', () => {
        expect(Int.isTypeOf(Int.of(1, 2, 3))).toBe(true)
      })
    })

    describe(Int.fromNumber.name, () => {
      it('returns some(Int) when Number.isInteger(n)', () => {
        expect(Int.fromNumber(1)).toStrictEqual(option.some(Int.of(1)))
      })
      it('returns nothing when !Number.isInteger(n)', () => {
        expect(Int.fromNumber(1.1)).toStrictEqual(option.none)
      })
    })

    describe(Int.unsafeFromNumber.name, () => {
      it('throws when number is not an integer', () => {
        expect(() => Int.unsafeFromNumber(1.1)).toThrow()
      })
      it('returns Int when Number.isInteger(n)', () => {
        expect(Int.isTypeOf(Int.unsafeFromNumber(1))).toBe(true)
      })
    })
  })

  describe('Type Guards', () => {
    describe(Int.isTypeOf.name, () => {
      it('evaluates to true on Ints', () => {
        expect(Int.isTypeOf(Int.of(1))).toBe(true)
        expect(Int.isTypeOf(1)).toBe(false)
      })
    })
  })

  describe('Typeclasses', () => {
    describe('Ord<Int>', () => {
      it('is lawful', () => {
        fptsLaws.ord(Int, arbitraryInt)
      })
    })

    describe(`Enum<Int>`, () => {
      const laws = getEnumLaws(Int, arbitraryInt)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe('Semiring<Int>', () => {
      const laws = getSemiringLaws(Int, arbitraryInt)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe('Ring<Int>', () => {
      const laws = getRingLaws(Int, arbitraryInt)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe('CommutativeRing<Int>', () => {
      const laws = getCommutativeRingLaws(Int, arbitraryInt)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe('EuclideanRing<Int>', () => {
      const laws = getEuclideanRingLaws(Int, arbitraryInt)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })
  })

  describe('Transformations', () => {
    describe(Int.toNumber.name, () => {
      it('evaluates to some(N) when N is within range of -2^53 and 2^53 - 1', () => {
        expect(Int.toNumber(Int.of(9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 1))).toStrictEqual(
          option.some(Number.MAX_SAFE_INTEGER)
        )
        expect(Int.toNumber(Int.of(-9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 1))).toStrictEqual(
          option.some(Number.MIN_SAFE_INTEGER)
        )
      })
      it('evaluates to none when N is outside the range of -2^53 and 2^53 -1', () => {
        expect(Int.toNumber(Int.of(9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2))).toStrictEqual(
          option.none
        )
        expect(Int.toNumber(Int.of(-9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2))).toStrictEqual(
          option.none
        )
      })
    })

    describe(Int.unsafeToNumber.name, () => {
      it('throws when unable to convert to number without truncating', () => {
        expect(() => Int.unsafeToNumber(Int.unsafeFromNumber(Number.MAX_VALUE))).toThrow()
        expect(() => Int.unsafeToNumber(Int.unsafeFromNumber(Number.MIN_VALUE))).toThrow()
      })

      it('converts the Int to number when safe to do so', () => {
        expect(Int.unsafeToNumber(Int.of(1))).toStrictEqual(1)
      })
    })
  })

  describe('Math operations', () => {
    describe(Int.abs.name, () => {
      it('inverts the sign of negative Ints', () => {
        fc.assert(
          fc.property(
            arbitraryInt.filter((n) => ord.lt(Int)(n, Int.zero)),
            (negInt) => Int.equals(Int.zero, Int.add(negInt, Int.abs(negInt)))
          )
        )
      })

      it('returns zero and positive Ints as is', () => {
        fc.assert(
          fc.property(
            arbitraryInt.filter((n) => ord.geq(Int)(n, Int.zero)),
            (nonNegInt) => Int.equals(nonNegInt, Int.abs(nonNegInt))
          )
        )
      })
    })

    describe(Int.rem.name, () => {
      it('makes any non-zero remainder take the sign of the dividend', () => {
        fc.assert(
          fc.property(
            fc
              .tuple(arbitraryInt, nonZeroInt)
              .filter(([n, d]) => !Int.equals(Int.zero, Int.rem(n, d))),
            ([dividend, divisor]) => {
              const remainder = Int.rem(dividend, divisor)

              return Int.equals(signum(Int)(remainder), signum(Int)(dividend))
            }
          )
        )
      })
    })

    describe(Int.quot.name, () => {
      it('performs truncating integer division, rounding toward zero', () => {
        const arbIntsThatCanBeConvertedToNumbersAndDontDivideEvently = fc
          .tuple(arbitraryInt, nonZeroInt)
          .filter(([n, d]) =>
            pipe(sequenceT(option.option)(Int.toNumber(n), Int.toNumber(d)), option.isSome)
          )
          .filter(([n, d]) => !Int.equals(Int.zero, Int.rem(n, d)))

        fc.assert(
          fc.property(arbIntsThatCanBeConvertedToNumbersAndDontDivideEvently, ([n, d]) => {
            const expected = Int.unsafeFromNumber(
              Math.trunc(Int.toNumberLossy(n) / Int.toNumberLossy(d))
            )
            return Int.equals(expected, Int.quot(n, d))
          })
        )
      })
    })

    describe(Int.toInteger.name, () => {
      it('is the identity function', () => {
        fc.assert(fc.property(arbitraryInt, (a) => Int.equals(a, Int.toInteger(a))))
      })
    })

    describe(Int.toRational.name, () => {
      it('makes in Int into a Ratio<Int>', () => {
        fc.assert(fc.property(arbitraryInt, (a) => Ratio.isTypeOf(Int.isTypeOf)(Int.toRational(a))))
      })
    })
  })
})
