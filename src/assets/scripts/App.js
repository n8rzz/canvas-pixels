define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    require('nerdery-request-animation-frame');
    var $ = require('jquery');
    var Modernizr = require('modernizr');
    var ImageManipulationController = require('controllers/ImageManipulationController');

    /**
     * Initial application setup. Runs once upon every page load.
     *
     * @class App
     * @constructor
     */
    var App = function($elementOrUndefined) {
        this.init($elementOrUndefined);
    };

    var proto = App.prototype;

    /**
     * Initializes the application and kicks off loading of prerequisites.
     *
     * @method init
     * @private
     */
    proto.init = function($elementOrUndefined) {
        /**
         * Base DOM element
         *
         * @type {jquery}
         * @default #canvasImage
         */
        this.$element = $elementOrUndefined || null;

        this.imageManipulationController = new ImageManipulationController(this.$element);
    };

    return App;

});