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
