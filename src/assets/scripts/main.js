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
        window.app = new App($canvas);
    }
);
