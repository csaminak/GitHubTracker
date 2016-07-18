(function(){
    'use strict';

    var $login = $('.login');
    var token = $('input[name="token"]');

    $('.login').on('submit', function(event){
        event.preventDefault();
        console.log(token.val());
        authenticateToken(token.val());
    });

    function authenticateToken(token) {
        return $.ajax({
            url: 'https://api.github.com',
            method: 'get',
            headers: {'Authorization': 'token ' + token},
            dataType: 'json'
        })
        .done(function(data){
            console.log('token validated');
        })
        .fail(function(data){
            console.log('token did not validate')
        });
    }

})();
