import * as fc from 'fast-check'

import { Int } from '../src'
import { gcd, lcm } from '../src/EuclideanRing'
import { arbitraryInt as arbInt } from '../src/Int/Arbitrary'
import { arbitraryNatural as arbNat } from '../src/Natural/Arbitrary'
import { NonNegative } from '../src/NonNegative'
import { NonZero } from '../src/NonZero'

describe('EuclideanRing', () => {
  describe(gcd.name, () => {
    test('If m is any integer, then gcd(a + m⋅b, b) = gcd(a, b)', () => {
      fc.assert(
        fc.property(fc.tuple(arbInt, arbInt, NonZero.getArbitrary(Int)(arbInt)), ([m, a, b]) => {
          const gcd1 = gcd(Int)(Int.add(a, Int.mul(m, b)), b)
          const gcd2 = gcd(Int)(a, b)
          return Int.equals(gcd1, gcd2)
        })
      )
    })

    test('If m is a non-negative integer, then gcd(m⋅a, m⋅b) = m⋅gcd(a, b)', () => {
      fc.assert(
        fc.property(fc.tuple(arbNat, arbInt, arbInt), ([m, a, b]) => {
          const prod = Int.mul(m, b)
          if (!NonZero.isTypeOf(Int)(prod)) return true
          const d = gcd(Int)(Int.mul(m, a), prod)
          return Int.equals(d, Int.mul(m, gcd(Int)(a, b)))
        })
      )
    })

    test('commutativity: gcd(a, b) = gcd(b, a)', () => {
      fc.assert(
        fc.property(fc.tuple(arbInt, arbInt), ([a, b]) => {
          return Int.equals(gcd(Int)(a, b), gcd(Int)(b, a))
        })
      )
    })

    test('associativity: gcd(a, gcd(b, c)) = gcd(gcd(a, b), c)', () => {
      fc.assert(
        fc.property(fc.tuple(arbInt, arbInt, arbInt), ([a, b, c]) => {
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
        fc.property(fc.tuple(arbInt, NonZero.getArbitrary(Int)(arbInt)), ([a, b]) => {
          const LCM = lcm(Int)(a, b)
          const abOverGcdAB = Int.div(Int.mul(a, b), gcd(Int)(a, b))
          return Int.equals(LCM, NonNegative.from(Int)(abOverGcdAB))
        })
      )
    })
  })
})
