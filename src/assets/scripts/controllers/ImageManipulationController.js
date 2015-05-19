/**
 * @fileOverview ImageManipulationController
 */
define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');

    /**
     *
     * @type {{RED: number, GREEN: number, BLUE: number}}
     */
    var RGB_COLORS = {
        RED: 0,
        GREEN: 1,
        BLUE: 2,
        ALPHA: 3,
        COMPONENTS: 4
    };

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
         * @param element
         * @type {string} #canvasImage
         * @default elementOrUndefined || null;
         */
        this.element = elementOrUndefined || null;
        /**
         * Image object with information to be manipulated
         *
         * @param imageObject
         * @type {object} <img/>
         * @default imageObjectOrUndefined || null;
         */
        this.imageObject = imageObjectOrUndefined || null;

        /**
         * @param copyOfImageObject
         * @type {null}
         */
        this.copyOfImageObject = null;

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
        this.copyOfImageObject = this.imageObject;
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
        this.copyOfImageObject = null;

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
        var heightIndex;
        var doubleRowHeight = this.invertedRowHeight * 2;

        for (heightIndex = 0; heightIndex < this.height; heightIndex++) {
            if (heightIndex % doubleRowHeight >= (doubleRowHeight / 2) &&
                heightIndex % doubleRowHeight <= (doubleRowHeight - 1)) {

                this.modifyImagePixelsInRow(heightIndex, dataToModify);

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
        var widthIndex;
        var i;
        var data = pixelDataToModify;

        for (widthIndex = 0; widthIndex < this.width; widthIndex++) {
            i = (heightIndex * this.width + widthIndex) * 4;
            data[i + RGB_COLORS.RED] = 255 - data[i + RGB_COLORS.RED];
            data[i + RGB_COLORS.GREEN] = 255 - data[i + RGB_COLORS.GREEN];
            data[i + RGB_COLORS.BLUE] = 255 - data[i + RGB_COLORS.BLUE];
        }
        return this;
    };


    return ImageManipulationController;
});
