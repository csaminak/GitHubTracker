(function(ns){
    'use strict';
    window.spa = ns = (ns || {});

    var $navBar = $('nav');

    window.addEventListener('load', function(){
        ns.loadView('#login');
        $('#login').show();
        $navBar.hide();
    });

    window.addEventListener('hashchange', function(){
        ns.loadView(window.location.hash);
        $navBar.show();
    });




    ns.loadView = function loadView(viewHash) {
        $('.view').hide();

        var viewBase = viewHash.split('/')[0];
        var $view = $(viewBase); //makes viewbase the view id.

        $('.nav > li')
            .removeClass('active')
            .find('[href="' + viewBase + '"]')
                .parent()
                    .addClass('active');

        if(!$view.length) {
            $view = $('#login');
        }

        $view.show();

        if(ns[viewBase.substr(1)] && ns[viewBase.substr(1)].load) {
            ns[viewBase.substr(1)].load( viewHash );
        }
    };

})(window.spa);
