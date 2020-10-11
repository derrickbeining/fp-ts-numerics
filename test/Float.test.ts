import * as fc from 'fast-check'

import { Float } from '../src/Float'
import { arbitraryFloat } from '../src/Float.Arbitrary'
import { getSemiringLaws } from '../src/Semiring.Laws'

describe.skip('Float', () => {
  describe('Typeclasses', () => {
    describe('Semiring<Float>', () => {
      const laws = getSemiringLaws(Float, arbitraryFloat)

      for (const [name, law] of Object.entries(laws)) {
        test(name, () => fc.assert(law, { numRuns: 1000 }))
      }
    })
  })
})
