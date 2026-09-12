import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('Running bundle analysis...')

try {
  // Run build with stats
  execSync('npm run build -- --mode production', {
    cwd: resolve(__dirname, '..'),
    stdio: 'inherit',
  })

  // Check dist size
  const distDir = resolve(__dirname, '../dist')
  const { execSync: exec } = require('child_process')
  
  console.log('\n=== Bundle Size Analysis ===')
  
  // Total size
  const totalSize = execSync(`du -sh ${resolve(__dirname, '../dist')}`, { encoding: 'utf8' })
  console.log(`Total dist size: ${totalSize.trim()}`)
  
  // Gzipped sizes
  console.log('\n=== Gzipped Sizes (top 20) ===')
  const files = execSync(`find ${resolve(__dirname, '../dist/assets')} -name "*.js" -o -name "*.css" | xargs gzip -c | wc -c`, { encoding: 'utf8' })
  
  // List top chunks
  console.log('\n=== Top JS Chunks ===')
  execSync(`ls -la dist/assets/*.js | sort -k5 -nr | head -20`, { cwd: resolve(__dirname, '..'), stdio: 'inherit' })
  
  console.log('\n=== Done ===')
} catch (error) {
  console.error('Bundle analysis failed:', error)
  process.exit(1)
}