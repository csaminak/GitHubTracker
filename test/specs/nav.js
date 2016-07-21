(function(){
    'use strict';
    var assert = window.chai.assert;

    var tracker = window.ghTracker;
    var fixtures = $('#fixtures').html();

    suite('Nav loadView', function(){

        setup(function(){
            $('#fixtures').html(fixtures);
        });

        teardown(function(){
            console.log('test is done');
        });

        test('make sure loadView function exists', function(){
            assert.ok(tracker.loadView, 'loadView exists b.c it can be called');
            assert.strictEqual(typeof(tracker.loadView), 'function', 'confirmed as a function');
        });

        test('loadView should make the requested view\'s nav li active ', function() {
            tracker.loadView('#myProfile');
            var activeNavItems = $('.nav li.active');
            console.log(activeNavItems);
            assert.strictEqual(activeNavItems.length, 1,
                                'there will be only one active tab at a time');
            // assert.strictEqual(activeNavItems.length, 1);
            // assert.strictEqual(activeNavItems.text(), '#myProfile');
        });

        // suite('display repo list', function(){
        //
        //     setup(function(){
        //         $('#fixtures').html(fixtures);
        //     });
        //     teardown(function(){
        //         console.log('after each test!');
        //     });
        //
        //     test('display repos', function(){
        //         window.gh.displayRepos( [ {name: 'foobar'} ] );
        //         var items = $('.results li');
        //         assert.strictEqual( items.length, 1);
        //         assert.strictEqual( items.text(), 'foobar');
        //     });
        //
        //     test('displays multiple repos', function(){
        //         window.gh.displayRepos( [ {name: 'foobar'}, {name: 'batbaz'} ] );
        //         var items = $('.results li');
        //         assert.strictEqual( items.length, 2);
        //     });
        //
        // });
        //
        // Can test for: 1. active class on li, 2. view is shown, 3. nav is shown

        // possibly values:
        // login
        // profile
        // repos
        // repo detail
        // null / undefined

        // test('see if li has an active class', function(){
        //     assert.isTrue(tabItem.hasClass('active'), false);
        // });

    });


})();
