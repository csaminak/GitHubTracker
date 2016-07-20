(function(ns){
    'use strict';
    window.spa = ns = (ns || {});


    ns.login = {};

    ns.login.load = function initLogin() {
        window.location.hash = '#login';
    };




    var $loginForm = $('.loginForm');
    var $token = $('input[name="token"]');

    ns.user = {};

    $loginForm.on('submit', function getMyProfile(event){
        event.preventDefault();
        $token = $token.val();
        console.log($token);
        authenticateToken($token)
            .done(goToMyProfile);
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
        .fail(function(data){ //WHAT SHOULD FAIL DO????
            console.log('token did not validate')
        });
    }

    /**
     * save the data retrieved from authenticateToken into the user object
     * to be used later in other views, then set the path to #myProfile.
     * @param  {Object} data    user object data returned from authenticateToken
     * @return {void}
     */
    function goToMyProfile(data) {
        ns.user = data;
        window.location.hash = '#myProfile';
    }



})(window.spa);