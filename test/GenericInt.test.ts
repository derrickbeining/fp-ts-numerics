import { int8 } from '../src/Int8'
import { int16 } from '../src/Int16'
import { int32 } from '../src/Int32'
import { uInt8 } from '../src/UInt8'
import { uInt16 } from '../src/UInt16'
import { uInt32 } from '../src/UInt32'
import * as GIntTest from './GenericIntTest'

GIntTest.runTests('UInt8', uInt8)
GIntTest.runTests('UInt16', uInt16)
GIntTest.runTests('UInt32', uInt32)

GIntTest.runTests('Int8', int8)
GIntTest.runTests('Int16', int16)
GIntTest.runTests('Int32', int32)
