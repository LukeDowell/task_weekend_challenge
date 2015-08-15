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

gulp.task('default', function() {
    //Client
    gulp.src('client/**/*')
        .pipe(gulp.dest(path.assets));

    //Angular
    gulp.src(angularSources)
        .pipe(gulp.dest(path.vendors + "angular"));
});

