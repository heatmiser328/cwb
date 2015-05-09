module.exports = function (config) {
    config.set({
        basePath: "../../",
        frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],

        files: [
            'www/lib/ionic/js/ionic.bundle.js',
            'www/lib/moment/moment.js',
            'www/lib/lodash/lodash.js',
            'test/mocks/angular-mocks.js',
            'www/js/services/services.module.js',
            'www/js/services/dice.js',
            'test/unit/services/dice-spec.js'
        ],
        usePolling: true,
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome']
    });
};