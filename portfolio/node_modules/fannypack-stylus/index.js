var Fannypack = require('fannypack')
var gulp      = require('gulp')
var $         = Fannypack.$

var stylus    = require('gulp-stylus')

Fannypack.Tasks['stylus'] = function(config){
  if(!config.stylus) return

  var paths = {
    src: $.Pather.join(config.root.src, config.stylus.src, '/**/*.' + config.stylus.extensions),
    dest: $.Pather.join(config.root.dest, config.stylus.dest)
  }

  gulp.task('stylus', function () {
    return gulp.src(paths.src)
      .pipe( $.SourceMaps.init() )
      .pipe( stylus(config.stylus.options) )
      .on('error', $.ErrorHandler)
      .pipe( $.Autoprefix(config.autoprefixer) )
      .pipe( $.SourceMaps.write() )
      .pipe( gulp.dest(paths.dest) )
      .pipe( $.BrowserSync.reload({stream:true}) )
  })
};
