(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});


    var repoData = [];
    var $reposTable = $('#repos .table');

    ns.repos = {};
    ns.repos.loadView = function initRepos() {
        window.location.hash = '#repos';
        if(retrieveRepositories) {
            displayRepos(repoData);
        } else {
            repoView();
        }
    };


    /**
     * Will take the data retrieved from the retrieveRepositories ajax call,
     * using userlogin info, and pass it into displayRepos.
     * @return {void}
     */
    function repoView() {
        retrieveRepositories(window.ghTracker.user.login)
            .done(displayRepos);
    }

    /**
     * takes each object and displays the specified content.
     * @param  {Array}  repoData   An array with objects each object as a repo.
     * @return {void}
     */
    function displayRepos(repoData){
        console.log(repoData);
        repoData.forEach(function(repo){
            $reposTable //TODO Need to update where repo anchor will go to, load repoDetail
                .append('<tr>\
                        <td class="repoName"><a>' + repo.name + '</a></td>\
                        <td class="stars">' + repo.stargazers_count + '</td>\
                        <td class="openIssues">' + repo.open_issues_count + '</td>\
                        </tr>');
            console.log(repo);
        });
    }


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
