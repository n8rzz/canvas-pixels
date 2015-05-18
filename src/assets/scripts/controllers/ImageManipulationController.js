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
     * @param {string} elementOrUndefined
     * @param {string} imageObjectOrUndefined
     */
    var ImageManipulationController = function(elementOrUndefined, imageObjectOrUndefined) {
        return this.init(elementOrUndefined, imageObjectOrUndefined);
    };

    var proto = ImageManipulationController.prototype;

    /**
     * Initialize the Controller
     *
     * @method init
     * @param  {string} elementOrUndefined [element|null|undefinied]
     * @param {string} imageObjectOrUndefined
     * @for ImageManipulationController
     * @chainable
     */
    proto.init = function(elementOrUndefined, imageObjectOrUndefined) {
        /**
         * Base DOM element
         *
         * @param $element
         * @type {string} #canvasImage
         * @default $elementOrUndefined || null;
         */
        this.element = elementOrUndefined || null;
        /**
         * Image object with information to be manipulated
         *
         * @param imageObject
         * @type {string} <img/>
         * @default imageObjectOrUndefined || null;
         */
        this.imageObject = imageObjectOrUndefined || null;

        /**
         * @param canvas
         * @type {string}
         */
        this.canvas = '';
        /**
         * @param context
         * @type {string}
         */
        this.context = '';
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
        /**
         * @param invertedRowHeight
         * @type {Number}
         */
        this.invertedRowHeight = -1;


        return this.createChildren()
                   .enable();
    };

    /**
     * Create child elements and DOM references
     *
     * @method createChildren
     * @for ImageManipulationController
     * @chainable
     */
    proto.createChildren = function() {
        this.canvas = document.getElementById(this.element);
        this.context = this.canvas.getContext('2d');
        this.width = this.imageObject.width;
        this.height = this.imageObject.height;
        this.invertedRowHeight = 4;

        this.context.drawImage(this.imageObject, 0, 0);

        return this;
    };

    /**
     * Enable the controller
     *
     * @method enable
     * @for ImageManipulationController
     * @chainable
     */
    proto.enable = function() {

        return this.drawModifiedImage();
    };

    /**
     * Disable the controller
     *
     * @method disable
     * @for ImageManipulationController
     * @chainable
     */
    proto.disable = function() {

        return this.destroy();
    };

    /**
     * Destroy the controller and tears down any child elements
     *
     * @method destroy
     * @for ImageManipulationController
     * @chainable
     */
    proto.destroy = function() {
        this.element = null;
        this.imageObject = null;
        this.canvas = '';
        this.context = '';
        this.width = -1;
        this.height = -1;
        this.imageObjectData = '';
        this.invertedRowHeight = -1;

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
        var context = this.context;

        this.imageObjectData = context.getImageData(0, 0, this.width, this.height);
        this.modifyImagePixels(this.imageObjectData.data);

        context.putImageData(this.imageObjectData, 0, 0);

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
        var doubleRowWidth = this.invertedRowHeight * 2;

        for (h = 0; h < this.height; h += this.invertedRowHeight) {
            if (h % doubleRowWidth === 0) {
                do {
                    h++;
                    this.modifyImagePixelsInRow(h, dataToModify);

                } while (h % doubleRowWidth !== this.invertedRowHeight);
            }
        }

        return this;
    };

    /**
     * Step through each pixel in the row and invert the rgb color values
     *
     * @method modifyImagePixelsInRow
     * @param heightIndex
     * @param pixelDataToModify
     * @for ImageManipulationController
     * @chainable
     */
    proto.modifyImagePixelsInRow = function(heightIndex, pixelDataToModify) {
        var w;
        var h = heightIndex;
        var i;
        var data = pixelDataToModify;

        for (w = 0; w < this.width; w ++) {
            i = (h * this.width + w) * 4;
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
        return this;
    };


    return ImageManipulationController;
});
