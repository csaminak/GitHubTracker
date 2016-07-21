(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});


    var $repos = $('#repos');
    var repoData = [];
    var

    $repos.on('click', repoView); //TODO store into nav function?

    /**
     * Will take the data retrieved from the retrieveRepositories ajax call,
     * using userlogin info, and pass it into displayRepos.
     * @return {void}
     */
    function repoView() {
        retrieveRepositories(ns.user.login)
            .done(function (repoData){
                console.log(repoData);
            });
    }

    /**
     * takes each object in the
     * @param  {Array}  repoData   An array with objects each object as a repo.
     * @return {void}
     */
    // function displayRepos(repoData){
    //     repoData.forEach(function(repo){
    //
    //     });
    // }


    /**
     * Take the username/login from the user object and input into url to access
     * all the repos the user has worked on, each element in the array is an object
     * containing a single repo's information.
     * @param  {String} username  retrieved from the user object to access repos.
     * @return {Array}            all the repositories associated with the user.
     */
    function retrieveRepositories(username){
        return $.ajax({
            url: 'https://api.github.com/users/' + username + '/repos',
            method: 'get',
            headers: {'Authorization': 'token ' + window.ghTracker.$token},
            dataType: 'json'
        })
        .done(function saveRepos(data){
            repoData = data;
            console.log(repoData);
        })
        .fail(function(xhr){ //TODO WHAT SHOULD FAIL DO????
            console.log(xhr);
        });
    }




})(window.ghTracker);
