const gulp       = require('gulp'),
      reload     = require('browser-sync').reload,
      concat     = require('gulp-concat'), 
      rename     = require('gulp-rename'),
      minifyCSS  = require('gulp-minify-css'),
      header     = require('gulp-header'),
      notify     = require('gulp-notify'),
      sourcemaps = require('gulp-sourcemaps'),
      stylus     = require('gulp-stylus'),
      nib        = require('nib'),
      stylint    = require('gulp-stylint'),
      path       = require('path'),      
      plumber    = require('gulp-plumber');


//datos
const data = require('./../frontend.json');

//Stamps
const banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.author.name %> - <%= pkg.author.email %>',
  ' * @license <%= pkg.license %>',
  ' *<%= new Date() %>',
  ' */',
  ''
].join('\n');


//tarea para compilar stylus
gulp.task('css',  () =>{
  return gulp.src(data.app + data.stylus + 'main.styl')
  .pipe(header(banner, { pkg : data } ))
  .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
  .pipe(sourcemaps.init()) //cargamos tarea de sourcemaps
  .pipe(stylus({ //iniciamos stylus
    use: nib(), // cargamos nib para uso de css3
    compress: false
  }))
  .pipe(rename('style.css')) //renombramos el archivo
  .pipe(gulp.dest(data.build + data.assets + data.css)) // destino del archivo
  .pipe(sourcemaps.write('../../maps')) //creamos sourcemap aparte
  .pipe(gulp.dest(data.build + data.assets + data.css))
  .pipe(reload({
      stream: true
    }))

});


//tarea para ver errores en sintaxis & semantica de stylus
gulp.task('csslint', () =>{
  return gulp.src([data.app + data.stylus + '**/*.styl', '!'+data.app + data.stylus + 'bootstrap/**/*.**',  '!'+data.app + data.stylus + 'font-awesome-stylus/**/*.**'  ])
        .pipe(stylint({
          rules:{
            'sortOrder': 'alphabetical',
            'namingConvention': {
                'expect': 'lowercase-dash',
                'error': true
            },
            'leadingZero': false,
            'commentSpace': false,
            'valid':{
              'expect':true,
              'error':true
            },
            'groupOutputByFile': true,
            'namingConventionStrict': true,
            'prefixVarsWithDollar': 'always'

          }

        }))
        //.pipe(plumber())notify('<%= options.message %>')
        .pipe(stylint.reporter({
          logger: notify.onError()
        }))

});

//Concatenar y minificar CSS
gulp.task('minicss',  () =>{
  return gulp.src([data.build + data.assets + data.css + '**/*.css', '!'+data.build + data.assets + data.css +'/**/'+data.name+'.min.css'])
  .pipe(concat(data.name +'.min.css'))
  .pipe(minifyCSS())
  .pipe(gulp.dest(data.build + data.assets + data.css))

});