require(
    [
        'jquery',
        './App'
    ],
    function(
        $,
        App
    ) {
        'use strict';

        var $canvas = $('#canvasImage');
        var app = new App($canvas);
    }
);
