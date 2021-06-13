import util from 'gulp-util';

const production = util.env.production || util.env.prod || false;
const destPath = 'build';

const config = {
    env       : 'development',
    production: production,

    src: {
        root         : 'src',
        sass         : 'src/scss',
        lib          : 'src/lib',
        img          : 'src/img',
        fonts        : 'src/fonts'
    },
    dest: {
        root : destPath,
        html : destPath,
        css  : destPath + '/css',
        lib   : destPath + '/lib',
        img  : destPath + '/img',
        fonts: destPath + '/fonts'
    },

    setEnv: function(env) {
      if (typeof env !== 'string') return;
      this.env = env;
      this.production = env === 'production';
      process.env.NODE_ENV = env;
    },

    logEnv: function() {
        util.log(
          'Environment:',
          util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },

    errorHandler: function (error) {
        console.log(error);
    }
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
