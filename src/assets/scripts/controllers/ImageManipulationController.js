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
        this.init($elementOrUndefined);
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
        this.imageData = '';

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
        // this.elementName = 'canvasImage';
        this.canvas = this.$element.get(0);
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

        return this.render();
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


    proto.redraw = function() {
        this.changeImage();

        return this;
    };


    proto.render = function() {
        var ctx = this.ctx;

        this.imageObj.src = IMAGE_SRC;
        ctx.drawImage(this.imageObj, 0, 0);


        return this.redraw();
    };


    proto.changeImage = function() {
        this.getImageData();
        this.changePixels();

        return this;
    };


    proto.getImageData = function() {
        var ctx = this.ctx;
        this.imageData = ctx.createImageData(this.canvas.width, this.canvas.height);

        console.log(this.imageData, this.canvas.width, this.canvas.height);

        // return this;
    };

    proto.setPixel = function(imageData, x, y, red, green, blue, alpha) {
        var index = ((y * imageData.width) + x) * 4;
        this.imageData[index] = red;
        this.imageData[index + 1] = green;
        this.imageData[index + 2] = blue;
        this.imageData[index + 3] = alpha;

    };


    proto.changePixels = function() {
        var ctx = this.ctx;
        var width = this.canvas.width;
        var height = this.canvas.height;
        var index;

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                index = (y * width + x) * 4;

                // console.log(x, y);
                // this.setPixel(this.imageData, x, y, 127, 127, 127, 0.75);
            }
        }

        ctx.putImageData(this.imageData, 0, 0);

    };

    return ImageManipulationController;
});