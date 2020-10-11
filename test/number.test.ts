import * as fc from 'fast-check'
import { record } from 'fp-ts'
import * as fptsLaws from 'fp-ts-laws'
import { getCommutativeRingLaws } from 'src/Class/CommutativeRing.Laws'
import { getRingLaws } from 'src/Class/Ring.Laws'
import { getSemiringLaws } from 'src/Class/Semiring.Laws'
import { NonZero } from 'src/Data/NonZero'
import { number } from 'src/Data/number'
import { UInt8 } from 'src/Data/UInt8'

describe('number', () => {
  describe('Typeclasses', () => {
    describe(`Eq`, () => {
      fptsLaws.eq(number, fc.double())
    })

    describe(`Ord`, () => {
      fptsLaws.ord(number, fc.double())
    })

    describe('Semiring', () => {
      const laws = getSemiringLaws(number, fc.float())

      for (const [name, law] of Object.entries(laws)) {
        test(name, () => fc.assert(law, { numRuns: 1000 }))
      }
    })

    describe(`Ring`, () => {
      const laws = getRingLaws(number, fc.double())
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe(`CommutativeRing`, () => {
      const laws = getCommutativeRingLaws(number, fc.double())
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    // can't reliably compare JS numbers, so property tests inevitably fails
    // describe(`Field`, () => {
    //   const laws = getFieldLaws(number, NonZero.getArbitrary(number)(fc.double(-100, 100)))
    //   record.keys(laws).forEach((law) => {
    //     test(law, () => fc.assert(laws[law]))
    //   })
    // })
  })
})
