(function(ns){
    'use strict';
    window.ghLogin = ns = (ns || {});

    var $login = $('form.login');
    var $token = $('input[name="token"]');
    var $myProfile = $('#myProfile');
    var $loginView = $('section.login');
    var $nav = $('.nav');
    ns.user = {};

    $login.on('submit', function(event){
        event.preventDefault();
        $token = $token.val();
        authenticateToken($token)
            .done(saveUser);
        $myProfile.show();
        $nav.show();
        $loginView.hide();
        console.log($token);
        console.log(ns.user);
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
     * to be used later in other views.
     * @param  {Object}   data    user object data returned from authenticateToken
     * @return {void}
     */
    function saveUser(data) {
        ns.user = data;
    }

})(window.ghLogin);
