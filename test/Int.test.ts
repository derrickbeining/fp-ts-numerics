import * as fc from 'fast-check'
import { option, ord, record } from 'fp-ts'
import * as fptsLaws from 'fp-ts-laws'
import { sequenceT } from 'fp-ts/lib/Apply'
import { pipe } from 'fp-ts/lib/pipeable'

import { getCommutativeRingLaws } from '../src/CommutativeRing.Laws'
import { getEnumLaws } from '../src/Enum.Laws'
import { gcd, lcm } from '../src/EuclideanRing.Extra'
import { getEuclideanRingLaws } from '../src/EuclideanRing.Laws'
import { Int } from '../src/Int'
import { arbitraryNatural } from '../src/Natural.Arbitrary'
import { toNonNegative } from '../src/NonNegative'
import { arbitraryNonZero, isNonZero, NonZero } from '../src/NonZero'
import { Ratio } from '../src/Ratio'
import { signum } from '../src/Ring.Extra'
import { getRingLaws } from '../src/Ring.Laws'
import { getSemiringLaws } from '../src/Semiring.Laws'
import { runEnumTestsFor } from './Enum'

const nonZeroInt = arbitraryNonZero(Int)(Int.Arbitrary)

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

    describe(Int.fromString.name, () => {
      it('returns some Int when string represents an integer', () => {
        expect(Int.fromString(Number.MAX_SAFE_INTEGER.toString())).toStrictEqual(
          option.some(Int.unsafeFromNumber(Number.MAX_SAFE_INTEGER))
        )
      })
      it('returns nothing when string does not represent an integer', () => {
        expect(Int.fromString('hello')).toStrictEqual(option.none)
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
        fptsLaws.ord(Int, Int.Arbitrary)
      })
    })

    describe(`Enum<Int>`, () => {
      const laws = getEnumLaws(Int, Int.Arbitrary)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })

      runEnumTestsFor(Int, Int.Arbitrary)
    })

    describe('Semiring<Int>', () => {
      const laws = getSemiringLaws(Int, Int.Arbitrary)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe('Ring<Int>', () => {
      const laws = getRingLaws(Int, Int.Arbitrary)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe('CommutativeRing<Int>', () => {
      const laws = getCommutativeRingLaws(Int, Int.Arbitrary)
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe('EuclideanRing<Int>', () => {
      describe('Laws', () => {
        const laws = getEuclideanRingLaws(Int, fc.tuple(Int.Arbitrary, Int.Arbitrary))
        record.keys(laws).forEach((law) => {
          test(law, () => fc.assert(laws[law]))
        })
      })

      describe(gcd.name, () => {
        test('If m is any integer, then gcd(a + m⋅b, b) = gcd(a, b)', () => {
          fc.assert(
            fc.property(
              fc.tuple(Int.Arbitrary, Int.Arbitrary, arbitraryNonZero(Int)(Int.Arbitrary)),
              ([m, a, b]) => {
                const gcd1 = gcd(Int)(Int.add(a, Int.mul(m, b)), b)
                const gcd2 = gcd(Int)(a, b)
                return Int.equals(gcd1, gcd2)
              }
            )
          )
        })

        test('If m is a non-negative integer, then gcd(m⋅a, m⋅b) = m⋅gcd(a, b)', () => {
          fc.assert(
            fc.property(fc.tuple(arbitraryNatural, Int.Arbitrary, Int.Arbitrary), ([m, a, b]) => {
              const prod = Int.mul(m, b)
              if (!isNonZero(Int)(prod)) return true
              const d = gcd(Int)(Int.mul(m, a), prod)
              return Int.equals(d, Int.mul(m, gcd(Int)(a, b)))
            })
          )
        })

        test('commutativity: gcd(a, b) = gcd(b, a)', () => {
          fc.assert(
            fc.property(fc.tuple(Int.Arbitrary, Int.Arbitrary), ([a, b]) => {
              const gcdAB = gcd(Int)(a, b)
              const gcdBA = gcd(Int)(b, a)
              const isEqual = Int.equals(gcdAB, gcdBA)
              if (!isEqual) {
                console.log({
                  a,
                  b,
                  gcdAB,
                  gcdBA: gcd(Int)(b, a),
                })
              }

              return isEqual
            })
          )
        })

        test('associativity: gcd(a, gcd(b, c)) = gcd(gcd(a, b), c)', () => {
          fc.assert(
            fc.property(fc.tuple(Int.Arbitrary, Int.Arbitrary, Int.Arbitrary), ([a, b, c]) => {
              const gcd1 = gcd(Int)(a, gcd(Int)(b, c))
              const gcd2 = gcd(Int)(gcd(Int)(a, b), c)

              return Int.equals(gcd1, gcd2)
            })
          )
        })

        test('gcd(0, 0) = 0', () => {
          expect(gcd(Int)(Int.zero, Int.zero)).toStrictEqual(Int.zero)
        })
      })

      describe(lcm.name, () => {
        test('lcm(0,0) = 0', () => {
          expect(lcm(Int)(Int.zero, Int.zero)).toStrictEqual(Int.zero)
        })
        test('lcm(a,0) = 0', () => {
          expect(lcm(Int)(Int.one, Int.zero)).toStrictEqual(Int.zero)
        })
        test('lcm(0,b) = 0', () => {
          expect(lcm(Int)(Int.zero, Int.one)).toStrictEqual(Int.zero)
        })
        test('lcm(a,b) = abs(a * b / gcd(a,b))', () => {
          fc.assert(
            fc.property(fc.tuple(Int.Arbitrary, arbitraryNonZero(Int)(Int.Arbitrary)), ([a, b]) => {
              const LCM = lcm(Int)(a, b)
              const abOverGcdAB = Int.div(Int.mul(a, b), gcd(Int)(a, b))
              return Int.equals(LCM, Int.abs(abOverGcdAB))
            })
          )
        })
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
        const tooBig = Int.of(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        const tooSmall = Int.of(-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        expect(() => Int.unsafeToNumber(tooBig)).toThrow()
        expect(() => Int.unsafeToNumber(tooSmall)).toThrow()
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
            Int.Arbitrary.filter((n) => ord.lt(Int)(n, Int.zero)),
            (negInt) => Int.equals(Int.zero, Int.add(negInt, Int.abs(negInt)))
          )
        )
      })

      it('returns zero and positive Ints as is', () => {
        fc.assert(
          fc.property(
            Int.Arbitrary.filter((n) => ord.geq(Int)(n, Int.zero)),
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
              .tuple(Int.Arbitrary, nonZeroInt)
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
          .tuple(Int.Arbitrary, nonZeroInt)
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

    describe(Int.toInt.name, () => {
      it('is the identity function', () => {
        fc.assert(fc.property(Int.Arbitrary, (a) => Int.equals(a, Int.toInt(a))))
      })
    })

    describe(Int.toRational.name, () => {
      it('makes in Int into a Ratio<Int>', () => {
        fc.assert(
          fc.property(Int.Arbitrary, (a) => Ratio.isTypeOf(Int.isTypeOf)(Int.toRational(a)))
        )
      })
    })
  })
})
