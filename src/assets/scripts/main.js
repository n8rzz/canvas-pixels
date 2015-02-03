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

        var $canvasImage = '#canvasImage';
        window.app = new App($canvasImage);
    }
);
