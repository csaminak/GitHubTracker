(function(){
    'use strict';

    var $login = $('form.login');
    var $token = $('input[name="token"]');
    var user = {};

    $login.on('submit', function(event){
        event.preventDefault();
        console.log($token.val());
        authenticateToken($token.val());
    });

    function authenticateToken(token) {
        return $.ajax({
            url: 'https://api.github.com/user',
            method: 'get',
            headers: {'Authorization': 'token ' + token},
            dataType: 'json'
        })
        .done(function(data){
            console.log('token validated')
            console.log(data);
        })
        .fail(function(data){
            console.log('token did not validate')
        });
    }

})();
