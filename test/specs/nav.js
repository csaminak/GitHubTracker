(function(){
    'use strict';

    var assert = chai.assert;

    var fixtures = $('#fixtures').html();

    suite('Load View', function(){

        test('make sure loadView function exists', function(){
            assert.ok(window.spa.loadView, 'loadView exists b.c it can be called');
            assert.strictEqual(typeof(window.spa.loadView), 'function', 'confirmed as a function');
        });

        // test('', function(){
        //
        // });

    });


})();
