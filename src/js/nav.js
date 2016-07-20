(function(ns){
    'use strict';
    window.spa = ns = (ns || {});

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
        if(viewHash !== '#login') { //
            $navBar.show();
            $login.hide();
        }

        if(ns[viewBase.substr(1)] && ns[viewBase.substr(1)].loadView) {
            ns[viewBase.substr(1)].loadView( viewHash );
        }
    };

})(window.spa);
