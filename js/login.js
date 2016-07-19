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
            user.username = data.login;
            user.name = data.name;
            user.repos = data.public_repos;
            user.followers = data.followers;
            user.following = data.following;
            user.accountCreated = data.created_at;
            console.log('token validated')
            console.log(user);
        })
        .fail(function(data){
            console.log('token did not validate')
        });
    }

})();
