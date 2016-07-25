(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});


    var reposData;
    var $reposTable = $('#repos .table');
    var $reposView = $('#repos');

    ns.repos = {};
    ns.repos.loadView = function initRepos() {
        reposView();
    };


    /**
     * Will take the data retrieved from the retrieveRepositories ajax call,
     * using userlogin info, and pass it into displayRepos.
     * @return {void}
     */
    function reposView() {
        if(!reposData){
            retrieveRepositories(window.ghTracker.user.login)
                .done(displayRepos)
                .fail(error);
        }
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
            reposData = data;
        });
    }


    /**
     * takes each object and displays the specified content.
     * @param  {Array}  repoData   An array with objects each object as a repo.
     * @return {void}
     */
    function displayRepos(reposData){
        reposData.forEach(function(repo){
            $reposTable //TODO Need to update where repo anchor will go to, load repoDetail
                .append('<tr>\
                            <td class="repoName">\
                            <a href="#repoDetail/'+ repo.owner.login + '/' + repo.name + '">' +
                            repo.name +
                            '</a>\
                            </td>\
                            <td class="stars">' + repo.stargazers_count + '</td>\
                            <td class="openIssues">' + repo.open_issues + '</td>\
                        </tr>');
        });
    }

    /**
    * possible error messages when trying to access repositories
    * @param  {jquery xhr Object}  contains the possible error status codes
    * @return {void}
     */
    function error(xhr) {
        if (xhr.status === 404) {
            $reposView
                .append('<p>The user\'s repositories you are trying to access\
                            is not found, maybe the username is incorrect?</p>');
        } else if (xhr.status >= 500) {
            console.log('Server side error');
            $reposView
                .append('<p>I\'m sorry, GitHub cannot be accessed right now.</p>');
        }
    }


})(window.ghTracker);
