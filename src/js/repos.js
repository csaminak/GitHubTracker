(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    // ns.repos = {};
    // ns.repos.loadView = function initRepos() {
    //     window.location.hash = '#repos';
    // };





    /**
     * Take the username/login from the user object and input into url to access
     * all the repos the user has worked on, each element in the array is an object
     * containing a single repo's information.
     * @param  {String} username  retrieved from the user object to access repos.
     * @return {Array}            all the repositories associated with the user.
     */
    // function retrieveRepositories(username){
    //     return $.ajax({
    //         url: 'https://api.github.com/users/' + username + '/repos',
    //         method: 'get',
    //         headers: {'Authorization': 'token ' + window.ghTracker.$token},
    //         dataType: 'json'
    //     });
    // }




})(window.ghTracker);
