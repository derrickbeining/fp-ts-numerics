import { Int8 } from 'src/Data/Int8'
import { Int16 } from 'src/Data/Int16'
import { Int32 } from 'src/Data/Int32'
import { UInt8 } from 'src/Data/UInt8'
import { UInt16 } from 'src/Data/UInt16'
import { UInt32 } from 'src/Data/UInt32'

import * as GIntTest from './GenericIntTest'

GIntTest.runTests('UInt8', UInt8)
GIntTest.runTests('UInt16', UInt16)
GIntTest.runTests('UInt32', UInt32)

GIntTest.runTests('Int8', Int8)
GIntTest.runTests('Int16', Int16)
GIntTest.runTests('Int32', Int32)
