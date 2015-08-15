/**
 * Created by Luke on 8/14/2015.
 */
var gulp = require('gulp');

var path = {
    assets: "server/public/assets/",
    vendors: "server/public/vendors/"
};
//Location of our angular modules we wish to copy
var angularSources = [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-aria/angular-aria.min.js',
    'node_modules/angular-material/angular-material.min.js',
    'node_modules/angular-material/angular-material.min.css'
];

//lint task
gulp.task('lint', function(){
    return gulp.src('client/scripts/app.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//compile Sass
//saves in css directory
gulp.task('sass', function(){
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

//concat and minify js
//all js files in /js directory are put together, saved to /dist, then minified, renamed, saved in dist alongside concatenated file
gulp.task('scripts', function(){
    return gulp.src('client/scripts/app.js')
        //probably not needed
        //.pipe(gulp.dest('dist'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('server/public/assets/scripts'));
});

gulp.task('html', function(){
    return gulp.src('client/views/index.html')
        .pipe(gulp.dest('server/public/assets/views'))
});
//watch functionality
//as you write code, this listens for changes and automatically runs said tasks
gulp.task('watch', function(){
    gulp.watch('client/scripts/app.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss',['sass']);
    gulp.watch('client/views/index.html', ['html']);
});

//default task
//all of these run when you enter gulp
gulp.task('default', ['lint','sass', 'scripts', 'watch']);

