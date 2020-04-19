import * as sh from 'shelljs'

import { compilerOptions as co } from '../tsconfig.typedoc.json'

sh.rm('-rf', 'docs')
sh.exec(`tsc -p tsconfig.typedoc.json`)

for (const file of sh.ls('-R', `${co.outDir}/**/*.d.ts`)) {
  sh.mv(file, file.replace('.d.ts', '.ts'))
}

sh.exec(`npx typedoc ${co.outDir} --options typedoc.js`)

sh.rm('-rf', co.outDir)
