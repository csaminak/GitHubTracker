(function(ns){
    'use strict';
    window.spa = ns = (ns || {});

    var $myProfile = $('#myProfile');
    var $loginView = $('section.login');
    var $nav = $('.nav');
    var $avatar = $('.avatar');

    ns.myProfile = {};
    ns.myProfile.loadView = function initMyProfile() {
        displayMyProfile(ns.user);
        console.log(ns.user);
    };


    function displayMyProfile(user) {
        $avatar
            .attr('src', user.avatar_url);
        
    };


})(window.spa);
