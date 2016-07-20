(function(ns){
    'use strict';
    window.spa = ns = (ns || {});

    ns.myProfile = {};

    ns.myProfile.load = function initMyProfile() {
        displayMyProfile(window.spa.user);
    };


    var $myProfile = $('#myProfile');
    var $loginView = $('section.login');
    var $nav = $('.nav');

    function displayMyProfile(user) {
        $myProfile
            .prepend('<img src="' + user.avatar_url + '" class="avatar" alt="userLogo" >');
        console.log(user.avatar_url);
    };


})(window.spa);
