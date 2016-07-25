(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    var $loginForm = $('.loginForm');
    ns.$token = $('input[name="token"]');
    ns.user = {};

    $loginForm.on('submit', function getMyProfile(event){
        event.preventDefault();
        ns.$token = ns.$token.val();
        console.log(ns.$token);
        authenticateToken(ns.$token)
            .done(enterMyProfile);
    });


    /**
     * Send a request to github to authenticate token and retrieve user info.
     * @param  {String}    token   token the user types into form
     * @return {jqueryObject}      user object associated with token
     */
    function authenticateToken(token) {
        return $.ajax({
            url: 'https://api.github.com/user',
            method: 'get',
            headers: {'Authorization': 'token ' + token},
            dataType: 'json'
        })
        .done(function saveUserInfo(data){
            ns.user = data;
        })
        .fail(function(xhr){ //TODO WHAT SHOULD FAIL DO????
            console.log('token did not validate', xhr);
            //401- unauthorized (need token)
        });
    }

    /**
     * save the data retrieved from authenticateToken into the user object
     * to be used later in other views, then set the path to #myProfile.
     * @param  {Object}   data    user object data returned from authenticateToken
     * @return {void}
     */
    function enterMyProfile(userData) {
        window.location.hash = '#myProfile';
        window.ghTracker.displayMyProfile(userData);
    }


})(window.ghTracker);
