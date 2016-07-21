(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});


    var $loginForm = $('.loginForm');
    ns.$token = $('input[name="token"]');

    $loginForm.on('submit', function getMyProfile(event){
        event.preventDefault();
        ns.$token = ns.$token.val();
        console.log(ns.$token);
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
        .fail(function(xhr){ //WHAT SHOULD FAIL DO????
            console.log('token did not validate', xhr);
        });
    }

    /**
     * save the data retrieved from authenticateToken into the user object
     * to be used later in other views, then set the path to #myProfile.
     * @param  {Object}   data    user object data returned from authenticateToken
     * @return {void}
     */
    function enterMyProfile(data) {
        window.location.hash = '#myProfile';
        window.ghTracker.displayMyProfile(data);
        console.log(data);
    }



})(window.ghTracker);

(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    var $avatar = $('.avatar');

    /**
     * Uses user information retrieved from login and displays it.
     * @param  {Object}     user    user object saved on the namespace.
     * @return {void}
     */
    ns.displayMyProfile = function displayMyProfile(user) {
        $avatar
            .attr('src', user.avatar_url);

    };


})(window.ghTracker);

(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    var $navBar = $('nav');
    var $login = $('#login');

    window.addEventListener('load', function(){
        ns.loadView('#login');
    });

    window.addEventListener('hashchange', function(){
        ns.loadView(window.location.hash);
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
        }

        $view.show();
        if(viewHash !== '#login') { //if view is not login, show nav, hide login
            $navBar.show();
        }

        if(ns[viewBase.substr(1)] && ns[viewBase.substr(1)].loadView) {
            ns[viewBase.substr(1)].loadView( viewHash );
        }
    };

})(window.ghTracker);

(function(ns){
    'use strict';
    window.ghTracker = ns = (ns || {});

    ns.repoDetail = {};
    ns.repoDetail.loadView = function initRepoDetail() {
        // if this function is called, then this view is being shown

    };
    //
    //







})(window.ghTracker);

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

//# sourceMappingURL=main.js.map