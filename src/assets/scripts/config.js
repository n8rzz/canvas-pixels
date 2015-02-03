require.config({
    paths: {
        requirejs: '../vendor/requirejs/require',
        modernizr: '../vendor/modernizr/modernizr',
        'nerdery-function-bind': '../vendor/nerdery-function-bind/index',
        'nerdery-request-animation-frame': '../vendor/nerdery-request-animation-frame/index',
        jquery: '../vendor/jquery/dist/jquery'
    },
    shim: {
        modernizr: {
            exports: 'Modernizr'
        }
    },
    waitSeconds: 120
});
