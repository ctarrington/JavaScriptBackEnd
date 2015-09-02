var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('javascript', function() {
    return gulp.src([
                        'bower_components/jquery/dist/jquery.min.js',
                        'bower_components/handlebars/handlebars.js',
                        'bower_components/ember/ember-template-compiler.js',
                        'bower_components/ember/ember.debug.js',
                        'bower_components/ember-data/ember-data.js'
                    ])
        .pipe(concat('candy-store-lib.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['javascript']);
