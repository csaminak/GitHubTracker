(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    ns.repoDetail = {};
    ns.repoDetail.loadView = function initRepoDetail() {
        // if this function is called, then this view is being shown
        //needs to run some ajax call to find the specific data that needs to be shown.
    };

    ns.displaySelectedRepo = function displaySelectedRepo(repo) {
        $('.nav')
            .append('<li><a href=#repoDetail>Repo Detail</a></li>');
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
            .append(repo.created_at);
        console.log(repo);
    };



})(window.ghTracker);
