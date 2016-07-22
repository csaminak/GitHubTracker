(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    ns.repoDetail = {};
    ns.repoDetail.loadView = function initRepoDetail(viewHash) {
        var selectedRepo = viewHash.split('/');
        var username = selectedRepo[1];
        var repoName = selectedRepo[2];
        requestRepoData(username, repoName)
            .done(displayRepoDetail);
    };

    /**
     * Uses the viewHash string passed in from loadView and splits it into an
     * Array and uses the value at the index as the arguments used to send ajax
     * get request to github to retrieve the individual repo object data.
     * @param  {String}    username    used for url for the user who owns the repo
     * @param  {String}    repoName    used for url for the specific repo to get
     * @return {Object}    the repo object
     */
    function requestRepoData(username, repoName){
        return $.ajax({
            url: 'https://api.github.com/repos/' + username + '/' + repoName + '',
            method: 'get',
            headers: {'Authorization': 'token ' + window.ghTracker.$token},
            dataType: 'json'
        });
    }

    /**
     * displays the view for the selected repo by using the data returned
     * from requestRepoData.
     * @param  {Object}     repo    repo data retrieved from the done promise.
     * @return {void}
     */
    function displayRepoDetail(repo) {
        $('#repoDetail h2')
            .html(repo.name);
        $('#repoDetail p')
            .html(repo.description);
        $('.owner')
            .append(window.ghTracker.user.login);
        $('.stars')
            .append(repo.stargazers_count);
        $('.forks')
            .append(repo.forks);
        $('.createDate')
            .append(repo.created_at); //TODO change date format
        console.log(repo);
    }



})(window.ghTracker);
