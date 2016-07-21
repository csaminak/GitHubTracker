(function(){
    'use strict';
    var assert = window.chai.assert;

    var tracker = window.ghTracker;
    var fixtures = $('#fixtures').html();

    suite('nav loadView', function(){

        setup(function(){
            $('#fixtures').html(fixtures);
        });

        teardown(function(){
            $('#fixtures').html();
        });

        test('make sure loadView function exists', function(){
            assert.ok(tracker.loadView, 'loadView exists b.c it can be called');
            assert.isFunction(tracker.loadView, 'confirmed as a function');
        });

        test('loadView should make the requested view\'s nav li active', function(){
            tracker.loadView('#myProfile');
            var activeNavItems = $('.nav [href="#myProfile"]').parent();
            assert.strictEqual(activeNavItems.hasClass('active'), true,
                                'active tab is on the selected view');
        });


        //start with my if statements in nav later
    });


})();
