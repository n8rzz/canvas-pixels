/**
 * @fileOverview ImageManipulationController
 */
define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');

    /**
     * Image Manipulation Controller
     *
     * @class ImageManipulationController
     * @param {jquery} $elementOrUndefined
     */
    var ImageManipulationController = function(elementOrUndefined, $imageObjectOrUndefined) {
        return this.init(elementOrUndefined, $imageObjectOrUndefined);
    };

    var proto = ImageManipulationController.prototype;

    /**
     * Initialize the Controller
     *
     * @method init
     * @param  {jquery} elementOrUndefined [element|null|undefinied]
     * @for ImageManipulationController
     * @chainable
     */
    proto.init = function(elementOrUndefined, $imageObjectOrUndefined) {
        /**
         * Base DOM element
         *
         * @param $element
         * @type {jquery} #canvasImage
         * @default $elementOrUndefined || null;
         */
        this.element = elementOrUndefined || null;
        /**
         * Image object with information to be manipulated
         *
         * @param $imageObject
         * @type {jquery} <img />
         * @default $imageObjectOrUndefined || null;
         */
        this.$imageObject = $imageObjectOrUndefined || null;

        /**
         * @param canvas
         * @type {string}
         */
        this.canvas = '';
        /**
         * @param ctx
         * @type {string}
         */
        this.ctx = '';
        /**
         * Canvas width
         * @param width
         * @type {number}
         */
        this.width = -1;
        /**
         * Canvas Height
         * @param height
         * @type {number}
         */
        this.height = -1;
        /**
         * @param imageObjectData
         * @type {string}
         */
        this.imageObjectData = '';


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
        this.canvas = document.getElementById(this.element);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.$imageObject.width;
        this.height = this.$imageObject.height;

        this.ctx.drawImage(this.$imageObject, 0, 0);

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

        return this.drawModifiedImage();
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
     * Destroys the controller and tears down any child elements
     *
     * @method destroy
     * @for ImageManipulationController
     * @chainable
     */
    proto.destroy = function() {
        this.element = null;
        this.$imageObject = null;
        this.canvas = '';
        this.ctx = '';
        this.width = -1;
        this.height = -1;
        this.imageObjectData = '';


        return this;
    };

    /**
     * Places modified image in the view after the image data has been changed
     *
     * @method drawModifiedImage
     * @for ImageManipulationController
     * @chainable
     */
    proto.drawModifiedImage = function() {
        var ctx = this.ctx;

        this.imageObjectData = ctx.getImageData(0, 0, this.width, this.height);
        this.modifyImagePixels(this.imageObjectData.data);

        ctx.putImageData(this.imageObjectData, 0, 0);

        return this;
    };

    /**
     * Loop through every 4th row and move pixel by pixel
     * manipulating each pixel in the row
     *
     * @method modifyImagePixels
     * @param dataToModify
     * @for ImageManipulationController
     * @chainable
     */
    proto.modifyImagePixels = function(dataToModify) {
        var h;
        var w;
        var i;
        var data = dataToModify;

        for (h = 0; h < this.height; h +=4) {
            for (w = 0; w < this.width; w ++) {
                i = (h * this.width + w) * 4;
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
        }

        return this;
    };

    return ImageManipulationController;
});
