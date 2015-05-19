define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    require('nerdery-request-animation-frame');
    var $ = require('jquery');
    var Modernizr = require('modernizr');
    var ImageManipulationController = require('controllers/ImageManipulationController');

    /**
     * Image to be manipulated and inserted into a canvas element
     * @final
     */
    var IMAGE_SRC = 'assets/media/images/learn-all-the-canvases.jpg';

    /**
     * Initial application setup. Runs once upon every page load.
     *
     * @class App
     * @constructor
     */
    var App = function($elementOrUndefined) {
        return this.init($elementOrUndefined);
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

        /**
         *
         * @type {Object}
         */
        this.imageManipulationController = null;


        return this.createChildren()
                    .enable();
    };

    /**
     *
     *
     * @method setupHandlers
     * @chainable
     */
    proto.setupHandlers = function() {
       this.imageManipulationController.bind(this);
    };

    /**
     * Create any child references
     *
     * @method createChildren
     * @chainable
     */
    proto.createChildren = function() {

        return this;
    };

    /**
     * Enables te view
     *
     * @method enable
     * @chainable
     */
    proto.enable = function() {

        return this.render();
    };

    /**
     * Redraw the view
     *
     * @method redraw
     * @cahinable
     */
    proto.redraw = function() {

        return this;
    };

    /**
     * Prepare the view to be redrawn
     *
     * @method render
     * @chainable
     */
    proto.render = function() {
        var $element = this.$element;
        var imageObject = new Image();

        $(imageObject).load(function() {
            this.imageManipulationController = new ImageManipulationController($element.attr('id'), imageObject);
        });

        imageObject.src = IMAGE_SRC;


        return this.redraw();
    };

    return App;

});
