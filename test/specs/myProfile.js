(function(){
    'use strict';

    var assert = window.chai.assert;
    var tracker = window.ghTracker;
    var fixtures = $('#fixtures').html();

    suite('displayMyProfile', function() {

        setup(function() {
            $('#fixtures').html(fixtures);
        });

        teardown(function() {
            $('#fixtures').html();
        });

        test('is displayMyProfile a function', function() {
            assert.isFunction(tracker.displayMyProfile(),
                                'displayMyProfile is a function');

        });



    });



})();
