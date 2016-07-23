(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    var repoData;
    var $repoDetail = '#repoDetail';
    var $issuesCount = $('.issuesCount');
    var $owner = $('.owner');
    var $stars = $('.stars');
    var $forks = $('.forks');
    var $createDate = $('.createDate');

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
     * @return {jquery xhr Object}     the repo object
     */
    function requestRepoData(username, repoName){
        return $.ajax({
            url: 'https://api.github.com/repos/' + username + '/' + repoName,
            method: 'get',
            headers: {'Authorization': 'token ' + window.ghTracker.$token},
            dataType: 'json'
        })
        .done(function saveRepo(data){
            repoData = data;
        })
        .fail(function(xhr){
            console.log(xhr); //TODO WHAT SHOULD FAIL DO????
        });
    }

    /**
     * displays the view for the selected repo by using the data returned
     * from requestRepoData.
     * @param  {Object}     repo    repo data retrieved from the done promise.
     * @return {void}
     */
    function displayRepoDetail(repoData) {
        var repoUrl = repoData.html_url;
        var name = repoData.name;
        var issuesCount = repoData.open_issues;
        var username = window.ghTracker.user.login;
        var description = repoData.description;
        var stars = repoData.stargazers_count;
        var forks = repoData.forks;
        var createdDate = repoData.created_at;

        $($repoDetail + ' h2')
            .html('<a href="' + repoUrl + '">' + name + '</a>');
        $($repoDetail + ' p')
            .html(description);
        $issuesCount
            .parent()
                .attr('href', repoUrl + '/issues');
        $issuesCount
            .html(issuesCount);
        $owner
            .html(username);
        $stars
            .html(stars);
        $forks
            .html(forks);
        $createDate
            .html(createdDate); //TODO change date format
    }
    

})(window.ghTracker);
