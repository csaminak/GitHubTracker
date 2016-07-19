(function(){
    'use strict';

    var $login = $('form.login');
    var $token = $('input[name="token"]');
    var $user = {};

    $login.on('submit', function(event){
        event.preventDefault();
        $token = $token.val();
        authenticateToken($token);
        console.log($token);
    });

    function authenticateToken(token) {
        return $.ajax({
            url: 'https://api.github.com/user',
            method: 'get',
            headers: {'Authorization': 'token ' + token},
            dataType: 'json'
        })
        .done(saveUser)
        .fail(function(data){
            console.log('token did not validate')
        });
    }

    function saveUser(data) {
        $user = data;
        console.log(data);
        console.log($user);
        retrieveRepositories($user.login)
            .done(function (data){
                console.log(data);
            });
    }

    function retrieveRepositories(username){
        return $.ajax({
            url: 'https://api.github.com/users/' + username + '/repos',
            method: 'get',
            headers: {'Authorization': 'token ' + $token},
            dataType: 'json'
        });
    }

})();
