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
        $username = user.login;
        $name = user.name;
        $repos = Number(user.public_repos);
        $followers = user.followers;
        $following = user.following;
        $accntOpen = user.created_at;

        
    };


})(window.ghTracker);
