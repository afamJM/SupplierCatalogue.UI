const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const combinemq = require('gulp-combine-mq');
const sasslint = require('gulp-sass-lint');
const ts = require('gulp-typescript');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const util = require('gulp-util');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const tslint = require('gulp-tslint');
const tsProjServer = ts.createProject('tsconfig.json');
const tsProjUI = ts.createProject('tsconfig.json');

gulp.task('sasslint', () =>
    gulp.src('src/scss/**/*')
        .pipe(sasslint())
        .pipe(sasslint.format())
        .pipe(sasslint.failOnError())
);

gulp.task('sass', ['sasslint'], () =>
    gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(combinemq())
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
);

gulp.task('images', () =>
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('tslint', () =>
    gulp.src(['**/*.ts', '!./node_modules/**/*'])
        .pipe(tslint({ formatter: 'verbose' }))
        .pipe(tslint.report())
);

gulp.task('ts:ui', ['tslint'], () =>
    gulp.src('src/ts/*.ts')
        .pipe(tsProjUI())
        .js.pipe(replace(/API_PORT/g, process.env.API_PORT))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .on('error', err => util.log(util.colors.red('[Error]'), err.toString()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'))
);

gulp.task('js', () =>
    gulp.src('src/js/**/*')
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .on('error', err => util.log(util.colors.red('[Error]'), err.toString()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'))
);

gulp.task('watch', () => {
    gulp.watch('src/scss/**/*', ['sass']);
    gulp.watch('src/img/**/*', ['images']);
    gulp.watch('src/ts/**/*', ['ts:ui']);
});


gulp.task('default', ['sass', 'images', 'js', 'ts:ui']);
