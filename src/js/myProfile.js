(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    var $avatar = $('.avatar');

    /**
     * Uses user information retrieved from login and displays it.
     * @param  {Object}     user    user object saved on the namespace.
     * @return {void}
     */
    ns.displayMyProfile = function displayMyProfile(user) {
        $avatar
            .attr('src', user.avatar_url);

    };


})(window.ghTracker);
