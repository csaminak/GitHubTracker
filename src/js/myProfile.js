(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    var $avatar = $('.avatar');
    var $username = $('.username');
    var $name = $('.name');
    var $repos = $('.repos');
    var $followers = $('.followers');
    var $following = $('.following');
    var $accntOpen = $('.accntOpen');

    /**
     * Uses user information retrieved from login and displays it.
     * @param  {Object}   user   the data retrieved from enterMyProfile at login.
     * @return {void}
     */
    ns.displayMyProfile = function displayMyProfile(user) {
        $avatar
            .attr('src', user.avatar_url);
        $username
            .append(user.login);
        $name
            .append(user.name);
        $repos
            .append(Number(user.public_repos));
        $followers
            .append(user.followers);
        $following
            .append(user.following);
        $accntOpen
            .append(Date(user.created_at));


    };


})(window.ghTracker);
