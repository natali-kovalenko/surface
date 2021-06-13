import gulp from 'gulp';
import config from './gulp/config';

const getTaskBuild = task => require('./gulp/tasks/' + task).build(gulp);
const getTaskWatch = task => require('./gulp/tasks/' + task).watch(gulp);

gulp.task('clean', getTaskBuild('clean'));
gulp.task('copy', getTaskBuild('copy'));
gulp.task('server', () => getTaskBuild('server'));
gulp.task('sass', () => getTaskBuild('sass'));
gulp.task('webpack', getTaskBuild('webpack'));

gulp.task('copy:watch', getTaskWatch('copy'));
gulp.task('sass:watch', getTaskWatch('sass'));
gulp.task('webpack:watch', getTaskWatch('webpack'));

const setmodeProd = done => {
  config.setEnv('production');
  config.logEnv();
  done();
}

const setmodeDev = done => {
  config.setEnv('development');
  config.logEnv();
  done();
}

gulp.task(
  'build',
  gulp.series(
    setmodeProd,
    'clean',
    'sass',
    'webpack',
    'copy'
  )
);

gulp.task(
  'build:dev',
  gulp.series(
    setmodeDev,
    'clean',
    'sass',
    'webpack',
    'copy'
  )
);

gulp.task(
  'watch',
  gulp.parallel(
    'copy:watch',
    'webpack:watch',
    'sass:watch'
  )
);

gulp.task('default', gulp.series(['build:dev', 'server', 'watch']));
