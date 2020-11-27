import * as fc from 'fast-check'

import { Float32 } from '../src/Float32'
import { getSemiringLaws } from '../src/Semiring.Laws'

describe.skip('Float', () => {
  describe('Typeclasses', () => {
    describe('Semiring<Float>', () => {
      const laws = getSemiringLaws(Float32, Float32.Arbitrary)

      for (const [name, law] of Object.entries(laws)) {
        test(name, () => fc.assert(law, { numRuns: 1000 }))
      }
    })
  })
})
