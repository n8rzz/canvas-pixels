define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    describe('Application class', function() {

        var App = require('./App');
    
        it('calls init when created', function() {
            // setup a spy on the App.init method to veryify that it was called
            spyOn(App.prototype, 'init');

            // perform the code to be tested
            var app = new App();

            // test the expectations
            expect(App.prototype.init).toHaveBeenCalled();

            expect(App.prototype.init.callCount).toEqual(1);
        });
    
    });

});