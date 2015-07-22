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
     * @param  {string} elementOrUndefined [element|null|undefined]
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

        return this.drawOriginalImage();
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

    proto.drawOriginalImage = function() {
        console.log('originalDraw');
        var context = this.context;
        this.imageObjectData = context.getImageData(0, 0, this.width, this.height);
        context.drawImage(this.imageObject, 0, 0);

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
        console.log('modifiedDraw');
        var context = this.context;
        this.imageObjectData = context.getImageData(0, 0, this.width, this.height);
        this.invertedRowHeight = 4;

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
        var x;
        var y;
        var doubleRowHeight = this.invertedRowHeight * 2;

        for (y = 0; y < this.height; y++) {
            for (x = 0; x < this.width; x++) {

                if (y % doubleRowHeight >= this.invertedRowHeight &&
                    y % doubleRowHeight <= (doubleRowHeight - 1)) {
                    this.modifyImagePixelsInRow(x, y, dataToModify);

                }
            }
        }

        return this;
    };

    /**
     * Step through each pixel by channel and change pixel value
     *
     * @method modifyImagePixelsInRow
     * @param x
     * @param y
     * @param pixelDataToModify
     * @for ImageManipulationController
     * @chainable
     */
    proto.modifyImagePixelsInRow = function(x, y, pixelDataToModify) {
        var i;
        var data = pixelDataToModify;

        i = (y * this.width + x) * RGB_COLORS.COMPONENTS;
        data[i + RGB_COLORS.RED] = 255 - data[i + RGB_COLORS.RED];
        data[i + RGB_COLORS.GREEN] = 255 - data[i + RGB_COLORS.GREEN];
        data[i + RGB_COLORS.BLUE] = 255 - data[i + RGB_COLORS.BLUE];

        return this;
    };


    return ImageManipulationController;
});
