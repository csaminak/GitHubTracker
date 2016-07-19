(function(ns){
    'use strict';
    window.ghProfile = ns = (ns || {});

    var $myProfile = $('#myProfile');
    var $loginView = $('section.login');
    var $nav = $('.nav');

    ns.displayMyProfile = function displayMyProfile(user) {
        $myProfile.show();
        $nav.show();
        $loginView.hide();
        $myProfile
            .append('<img src=' + user.avatar_url + ' class="avatar" alt="userLogo" >');
        console.log(user.avatar_url);
    };


})(window.ghProfile);
