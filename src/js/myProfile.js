(function(ns){
    'use strict';
    window.spa = ns = (ns || {});


    var $avatar = $('.avatar');

    ns.myProfile = {};
    ns.myProfile.loadView = function initMyProfile() {
        displayMyProfile(ns.user);
        console.log(ns.user);
    };


    function displayMyProfile(user) {
        $avatar
            .attr('src', user.avatar_url);
    }


})(window.spa);
