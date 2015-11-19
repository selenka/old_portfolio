# fannypack-stylus
Official Fannypack task for compiling Stylus files

## Installation
`npm install fannypack-stylus --save-dev`

## Usage
```javascript
// gulpfile.js

var Fannypack = require('fannypack')

require('fannypack-stylus')

Fannypack.Config.stylus = {
  // Config.root.src + 'src' dir
  src: 'stylus',
  // Config.root.src + 'dest' dir
  dest: 'assets/css',
  // Auto-run this task in dev mode?
  watchTask: true,
  codeTask: true,
  // Any options to pass into gulp-stylus()
  options: {},
  // File extensions to watch
  extensions: ['styl']
}

Fannypack.init()
```
