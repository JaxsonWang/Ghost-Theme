import { cwd } from 'node:process'
import path from 'node:path'
import compressing from 'compressing'

const defaultOption = {
  sourceName: 'dist',
  type: 'zip',
  targetName: 'dist'
}

function compression(options = defaultOption) {
  const sourceName = options.sourceName ?? 'dist'
  const type = options.type ?? 'zip'
  const targetName = options.targetName ?? 'dist'

  const targetPath = path.resolve(cwd(), sourceName)
  return {
    name: 'compression',
    closeBundle() {
      return compressing.zip.compressDir(targetPath, `${targetName}.${type}`, { ignoreBase: options.ignoreBase })
    }
  }
}

export default compression
