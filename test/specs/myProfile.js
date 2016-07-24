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
            assert.isFunction(tracker.displayMyProfile,
                                'displayMyProfile is a function');
        });

        test('does displayMyProfile show the user\'s name', function() {
            var user = {name: 'samina', created_at: '1234567890'};
            var $name = $('.name');
            tracker.displayMyProfile(user);
        //     assert.deepEqual($name.text(), 'Name: ' + user.name,
        //                             'user\'s name is displayed');
        // });



    });



})();
