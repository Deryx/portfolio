/**
 * Created by dscott on 8/27/2015.
 */

$( function() {
    var sectionHeight = $(document).height();
    var sectionWidth = $(window).width;

    $( '#introduction, #about, #skills, #portfolio, #contact, #site-overlay' ).css( 'height', sectionHeight );

    $('header nav a').on( 'click', function() {
        $( 'section:visible' ).animate( { width: 'hide' }, 1000 );
        var $newPage = $(this).attr('href');
        $( 'section' + $newPage ).animate( { width: 'show' }, 1000 );
    });

    $( 'div.page-arrow span[class*="glyphicon-chevron-left"]' ).on( 'click', function() {
        var $pressedArrow = this;
        executeArrow.call( this, $pressedArrow );
    });

    $( 'div.page-arrow span[class*="glyphicon-chevron-right"]' ).on( 'click', function() {
        var $pressedArrow = this;
        executeArrow.call( this, $pressedArrow );
    });

    $('.slide-viewer').each(function() {
        var $this = $(this);
        var $group = $this.find('.slide-group');
        var $slides = $this.find('.slide');
        var buttonArray = [];
        var currentIndex = 0;
        var timeout;

        function move( newIndex ) {
            var animateLeft, slideLeft;

            if ( $group.is(':animated') || currentIndex === newIndex ) {
                return;
            }

            buttonArray[ currentIndex].removeClass( 'active' );
            buttonArray[ newIndex].addClass( 'active');

            if ( newIndex > currentIndex ) {
                slideLeft = '100%';
                animateLeft = '-100%';
            } else {
                slideLeft = '-100%';
                animateLeft = '100%';
            }

            $slides.eq( newIndex ).css( { left: slideLeft, display: 'block' });
            $group.animate( { left: animateLeft }, function() {
                $slides.eq( currentIndex ).css( { display: 'none' });
                $slides.eq( newIndex ).css( { left: 0 } );
                $group.css( { left: 0 } );
                currentIndex = newIndex;
            });
        }

        function advance() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                if (currentIndex < ($slides.length - 1)) {
                    move(currentIndex + 1);
                } else {
                    move(0);
                }
            }, 8000);
        }

        $.each( $slides, function( index ) {
            var $button = $( '<button type="button" class="slide-btn">&bull;</button>' );
            if (index === currentIndex ) {
                $button.addClass( 'active' )
            }
            $button.on( 'click', function() {
                move( index );
            }).appendTo( '.slide-buttons' );
            buttonArray.push( $button );
        });
    });

    $( '#buttons button' ).on( 'click', function() {
        var $currentSV = $( '#skill-levels > div:visible' );
        $currentSV.hide();
        var $showSection = $( this ).attr( 'id' );
        $( 'div#' + $showSection ).slideDown(3000);
    });

    $( '.column' ).hover(function() {
        var $this = $( this );
        var $overlay = $this.find( '.overlay' );
        $( $overlay ).slideDown( 1000 );
    }, function() {
        $( '.overlay:visible' ).slideUp( 1000 );
    });

    $( '[class*=btn-info]' ).on( 'click', function() {
        var $button = $( this );
        var buttonID = $button.attr( 'id' );
        $( '#site-overlay' ).show();
        $( '#lightbox-' + buttonID ).show();
    })

    $( '#site-overlay' ).on( 'click', function() {
        $( this ).hide();
        $( '[id*=lightbox]' ).hide();
    });

    $( '[class*=glyphicon-remove]' ).on( 'click', function() {
        $( '#site-overlay' ).hide();
        $( '[id*=lightbox]' ).hide();
    });
});

function executeArrow(pressedArrow) {
    var $pressedArrow = pressedArrow.getAttribute( 'class' );
    var $current = $( 'section:visible' );
    var $forwardArrow = 'glyphicon glyphicon-chevron-right';
    var $backArrow = 'glyphicon glyphicon-chevron-left';

    if ( $pressedArrow === $forwardArrow ) {
        var $next = $current.next();
        if($next.attr('class') === 'page') {
            $current.hide().removeClass('animated slideInLeft');
            $next.show().addClass('animated slideInLeft');
            $current.removeClass('animated slideInRight');
            $current.removeClass('animated slideInLeft');
        }
    } else if ( $pressedArrow === $backArrow ) {
        var $previous = $current.prev();
        if($previous.attr('class') === 'page') {
            $current.hide().removeClass('animated slideInRight');
            $previous.show().addClass('animated slideInRight');
            $current.removeClass('animated slideInLeft');
            $current.removeClass('animated slideInRight');
        }
    }
}
