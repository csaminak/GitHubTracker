(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    var $loginForm = $('.loginForm');
    var $loginView = $('#login');
    ns.$token = $('input[name="token"]');
    ns.user = {};

    $loginForm.on('submit', function getMyProfile(event){
        event.preventDefault();
        ns.$token = ns.$token.val();
        authenticateToken(ns.$token)
            .done(enterMyProfile)
            .fail(error);
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

    /**
     * login possible error messages
     * @param  {jquery xhr Object}  contains the possible error status codes
     * @return {void}
     */
    function error(xhr) {
        if (xhr.status === 401) {
            console.log('Access is unauthorized because a token is required or incorrect.');
            $loginView
                .append('<p>Token is required, please input the correct id.</p>');
        } else if (xhr.status >= 500) {
            console.log('Server side error');
            $loginView
                .append('<p>I\'m sorry, GitHub cannot be accessed right now.</p>');
        }
    }

})(window.ghTracker);
