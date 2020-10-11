import * as fc from 'fast-check'
import { getSemiringLaws } from 'src/Class/Semiring.Laws'
import { Float } from 'src/Data/Float'
import { arbitraryFloat } from 'src/Data/Float.Arbitrary'

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
