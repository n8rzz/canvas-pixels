/**
 * @fileOverview ImageManipulationController
 */
define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');
    var IMAGE_SRC = 'assets/media/images/learn-all-the-canvases.jpg';

    /**
     * Image Manipulation Controller
     *
     * @class ImageManipulationController
     * @param {jquery} $elementOrUndefined
     */
    var ImageManipulationController = function($elementOrUndefined) {
        this.init();
    };

    var proto = ImageManipulationController.prototype;

    /**
     * Initialize the Controller
     *
     * @method init
     * @param  {jquery} $elementOrUndefined [element|null|undefinied]
     * @for ImageManipulationController
     * @chainable
     */
    proto.init = function($elementOrUndefined) {
        console.log('-- ImageManipulationController.init()');

        /**
         * Base DOM element
         *
         * @param $element
         * @type {jquery} #canvasImage
         * @default $elementOrUndefined || null;
         */
        this.$element = $elementOrUndefined || null;

        /**
         * Canvas element name
         *
         * @property elementName
         * @type {String}
         * @default null
         */
        this.elementName = '';

        this.canvas = '';
        this.ctx = '';
        this.imageObj = '';

        return this.createChildren()
                   .enable();
    };

    /**
     * Creates child elements
     *
     * @method createChildren
     * @for ImageManipulationController
     * @chainable
     */
    proto.createChildren = function() {
        this.elementName = 'canvasImage';
        this.canvas = document.getElementById(this.elementName);
        this.ctx = this.canvas.getContext('2d');
        this.imageObj = new Image();


        return this;
    };

    /**
     * Enables the controller
     *
     * @method enable
     * @for ImageManipulationController
     * @chainable
     */
    proto.enable = function() {

        return this;
    };

    /**
     * Disables the controller
     *
     * @method disable
     * @for ImageManipulationController
     * @chainable
     */
    proto.disable = function() {

        return this.destroy();
    };

    /**
     * Destroys the controller and any child elements
     *
     * @method destroy
     * @for ImageManipulationController
     * @chainable
     */
    proto.destroy = function() {

        return this;
    };

    proto.redraw = function() {};
    proto.render = function() {
        var ctx = this.ctx;
        ctx.drawImage(this.imageObj, 0, 0);

        this.imageObj.onload = function() {
            this.imageObj.src = IMAGE_SRC;
        };


        return this.redraw();
    };

    return ImageManipulationController;
});