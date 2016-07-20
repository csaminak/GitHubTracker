(function(ns){
    'use strict';
    window.spa = ns = (ns || {});

    ns.myProfile = {};

    ns.myProfile.loadView = function initMyProfile() {
        displayMyProfile(window.spa.user);
    };


    var $myProfile = $('#myProfile');
    var $loginView = $('section.login');
    var $nav = $('.nav');
    var $avatar = $('.avatar');

    function displayMyProfile(user) {
        $avatar
            .attr('src="' + user.avatar_url + '" alt="userLogo">');
        
        console.log(user.avatar_url);
    };


})(window.spa);
