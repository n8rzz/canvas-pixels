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
     *
     * @type {number}
     */
    var INVERTED_ROW_HEIGHT = 10;
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
         * @param $element
         * @type {jquery}
         * @default #canvasImage
         */
        this.$element = $elementOrUndefined || null;

        /**
         * @param imageObject
         * @type {object}
         * @default null
         */
        this.imageObject = null;

        /**
         * @param imageMnipulationcontroller
         * @type {Object}
         * @default null
         */
        this.imageManipulationController = null;


        return this.setupHandlers()
                    .createChildren()
                    .enable();
    };

    /**
     *
     *
     * @method setupHandlers
     * @chainable
     */
    proto.setupHandlers = function() {
        this._onImageLoadHandler = $.proxy(this._onImageLoad, this);
        this.imageManipulationControllerHandler = $.proxy(this.imageManipulationController, this);

        return this;
    };

    /**
     * Create any child references
     *
     * @method createChildren
     * @chainable
     */
    proto.createChildren = function() {
        this.imageObject = new Image();
        this.imageObject.addEventListener('load', this._onImageLoadHandler, false);
        this.imageObject.src = IMAGE_SRC;

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

        return this.redraw();
    };

    /**
     * @method  _onImageLoad
     * @for App
     */
    proto._onImageLoad = function() {
        this.imageManipulationController = new ImageManipulationController(this.$element.attr('id'), this.imageObject);
        this.imageManipulationController.drawOriginalImage();
        this.imageManipulationController.drawModifiedImage(INVERTED_ROW_HEIGHT);

        return this;
    };

    return App;

});
