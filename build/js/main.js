(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    var $loginForm = $('.loginForm');
    ns.$token = $('input[name="token"]');
    ns.user = {};

    $loginForm.on('submit', function getMyProfile(event){
        event.preventDefault();
        ns.$token = ns.$token.val();
        authenticateToken(ns.$token)
            .done(enterMyProfile);
    });


    /**
     * Send a request to github to authenticate token and retrieve user info.
     * @param  {String}    token   token the user types into form
     * @return {jqueryObject}      user object associated with token
     */
    function authenticateToken(token) {
        return $.ajax({
            url: 'https://api.github.com/user',
            method: 'get',
            headers: {'Authorization': 'token ' + token},
            dataType: 'json'
        })
        .done(function saveUserInfo(data){
            ns.user = data;
        })
        .fail(function(xhr){ //TODO WHAT SHOULD FAIL DO????
            console.log('token did not validate', xhr);
        });
    }

    /**
     * save the data retrieved from authenticateToken into the user object
     * to be used later in other views, then set the path to #myProfile.
     * @param  {Object}   data    user object data returned from authenticateToken
     * @return {void}
     */
    function enterMyProfile(userData) {
        window.location.hash = '#myProfile';
        window.ghTracker.displayMyProfile(userData);
    }


})(window.ghTracker);

(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    var $avatar = $('.avatar');
    var $username = $('.username');
    var $name = $('.name');
    var $repos = $('.repos');
    var $followers = $('.followers');
    var $following = $('.following');
    var $accntOpen = $('.accntOpen');

    /**
     * Uses user information retrieved from login and displays it.
     * @param  {Object}   user   the data retrieved from enterMyProfile at login.
     * @return {void}
     */
    ns.displayMyProfile = function displayMyProfile(user) {
        var date = (user.created_at).slice(0,10);
        $avatar
            .attr('src', user.avatar_url);
        $username
            .append('<a href="' + user.html_url + '">' + user.login + '</a>');
        $name
            .append(user.name);
        $repos
            .append(Number(user.public_repos));
        $followers
            .append(user.followers);
        $following
            .append(user.following);
        $accntOpen
            .append(date);
    };


})(window.ghTracker);

(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    var $navBar = $('nav');
    var $login = $('#login');

    window.addEventListener('hashchange', function(){
        ns.loadView(window.location.hash);
    });

    window.addEventListener('load', function(){
        ns.loadView(window.location.hash = '#login');
    });


    ns.loadView = function loadView(viewHash) {
        $('.view').hide();

        var viewBase = viewHash.split('/')[0];
        var $view = $(viewBase);

        $('.nav > li')
            .removeClass('active')
            .find('[href="' + viewBase + '"]')
                .parent()
                    .addClass('active');

        if(!$view.length) {
            $view = $login;
        } else {
            $view.show();
        }

        if(viewHash !== '#login') {
            $navBar.show();
        }

        if(viewBase !== '#repoDetail') {
            $('.detailTab').hide();
        } else if(viewBase === '#repoDetail') {
            $('.detailTab').show();
        }

        if(ns[viewBase.substr(1)] && ns[viewBase.substr(1)].loadView) {
            ns[viewBase.substr(1)].loadView( viewHash );
        }
    };


})(window.ghTracker);

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
        var createdDate = repoData.created_at.slice(0,10);

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
            .html(createdDate);
    }


})(window.ghTracker);

(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});


    var reposData;
    var $reposTable = $('#repos .table');

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
                .done(displayRepos);
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
        })
        .fail(function(xhr){ //TODO WHAT SHOULD FAIL DO????
            console.log(xhr);
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


})(window.ghTracker);

//# sourceMappingURL=main.js.map