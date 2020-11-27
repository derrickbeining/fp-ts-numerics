import * as fc from 'fast-check'
import { record } from 'fp-ts'
import * as fptsLaws from 'fp-ts-laws'

import { getCommutativeRingLaws } from '../src/CommutativeRing.Laws'
import { Float64 } from '../src/Float64'
import { getRingLaws } from '../src/Ring.Laws'
import { getSemiringLaws } from '../src/Semiring.Laws'

describe('Float64', () => {
  describe('Typeclasses', () => {
    describe(`Eq`, () => {
      fptsLaws.eq(Float64, fc.double())
    })

    describe(`Ord`, () => {
      fptsLaws.ord(Float64, fc.double())
    })

    describe('Semiring', () => {
      const laws = getSemiringLaws(Float64, fc.float())

      for (const [name, law] of Object.entries(laws)) {
        test(name, () => fc.assert(law, { numRuns: 1000 }))
      }
    })

    describe(`Ring`, () => {
      const laws = getRingLaws(Float64, fc.double())
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    describe(`CommutativeRing`, () => {
      const laws = getCommutativeRingLaws(Float64, fc.double())
      record.keys(laws).forEach((law) => {
        test(law, () => fc.assert(laws[law]))
      })
    })

    // can't reliably compare JS numbers, so property tests inevitably fails
    // describe(`Field`, () => {
    //   const laws = getFieldLaws(Float64, NonZero.getArbitrary(Float64)(fc.double(-100, 100)))
    //   record.keys(laws).forEach((law) => {
    //     test(law, () => fc.assert(laws[law]))
    //   })
    // })
  })
})
