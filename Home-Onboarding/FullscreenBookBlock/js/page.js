var Page = (function() {

	var $container = $( '#container' ),
		$bookBlock = $( '#bb-bookblock' ),
		$items = $bookBlock.children(),
		itemsCount = $items.length,
		current = 0,
		bb = $( '#bb-bookblock' ).bookblock( {
			speed : 800,
			perspective : 2000,
			shadowSides	: 0.8,
			shadowFlip	: 0.4,
			onEndFlip : function(old, page, isLimit) {
				
				current = page;
				// update TOC current
				updateTOC();
				// updateNavigation
				updateNavigation( isLimit );
				// initialize jScrollPane on the content div for the new item
				setJSP( 'init' );
				// destroy jScrollPane on the content div for the old item
				setJSP( 'destroy', old );

			}
		} ),
		$navNext = $( '#bb-nav-next' ).show(),
		$navPrev = $( '#bb-nav-prev' ).show(),
		$menuItems = $container.find( 'ul.menu-toc > li' ),
		$tblcontents = $( '#tblcontents' ),
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		supportTransitions = Modernizr.csstransitions;
        
	function init() {

		// initialize jScrollPane on the content div of the first item
		setJSP( 'init' );
		initEvents();

	}
	
	function initEvents() {

		// add navigation events
		$navNext.on( 'click', function() {
			bb.next();
			return false;
		} );

		$navPrev.on( 'click', function() {
			bb.prev();
			return false;
		} );
		
		// add swipe events
		$items.on( {
			'swipeleft'		: function( event ) {
				if( $container.data( 'opened' ) ) {
					return false;
				}
				bb.next();
				return false;
			},
			'swiperight'	: function( event ) {
				if( $container.data( 'opened' ) ) {
					return false;
				}
				bb.prev();
				return false;
			}
		} );
		
		$tblcontents.on( 'click', toggleTOC );
			
		var page = $('body');
		var menu = page.find('ul.menu-set');
		var menuItem = page.find('ul.menu-set li');
		
		menuItem.on('click' , function(){
			$(this).addClass('current')
			.siblings()
			.removeClass('current');
			setTimeout(function(){
			closeTOC();
			},500);
			});
		
		function login(){
			$('div#login-form').css({'-webkit-transform':'translateX(0)'});
			$('div#login-form').addClass('visible');
			};
		
		function register(){
			 $('.bb-item').css({'-webkit-transform':'translateY(0)'});
			 if(!$('.bb-item').hasClass('visible')){
			 $navNext.show();
		     $navPrev.show();
			 }
			 $('.bb-item').addClass('visible');
			}
		
         $('a#login-form').click(function(){
			login();
			 });
		
		$('a#register').click(function(){
			register();
			 });
			
		
		
		
		   $('a#register , a#home').click(function(){
	
			if($('div#login-form').hasClass('visible'))
			{
				$('div#login-form').css({'-webkit-transform':'translateX(100%)'});
			}
		});
		
		$('a#login-form , a#home').click(function(){
	
			if($('.bb-item').hasClass('visible'))
			{
				$('.bb-item').css({'-webkit-transform':'translateY(100%)'});
			}
		});
		
		
		
		
		
		

		// reinit jScrollPane on window resize
		$( window ).on( 'debouncedresize', function() {
			// reinitialise jScrollPane on the content div
			setJSP( 'reinit' );
		} );

	}

	function setJSP( action, idx ) {
		
		var idx = idx === undefined ? current : idx,
			$content = $items.eq( idx ).children( 'div.content' ),
			apiJSP = $content.data( 'jsp' );
		
		if( action === 'init' && apiJSP === undefined ) {
			$content.jScrollPane({verticalGutter : 0, hideFocus : true });
		}
		else if( action === 'reinit' && apiJSP !== undefined ) {
			apiJSP.reinitialise();
		}
		else if( action === 'destroy' && apiJSP !== undefined ) {
			apiJSP.destroy();
		}

	}

	function updateTOC() {
		$menuItems.removeClass( 'menu-toc-current' ).eq( current ).addClass( 'menu-toc-current' );
	}

	function updateNavigation( isLastPage ) {
		

	}

	function toggleTOC() {
		var opened = $container.data( 'opened' );
		opened ? closeTOC() : openTOC();
	}

	function openTOC() {
		$navNext.hide();
		$navPrev.hide();
		$container.addClass( 'slideRight' ).data( 'opened', true );
	}

	function closeTOC( callback ) {

		updateNavigation( current === itemsCount - 1 );
		$container.removeClass( 'slideRight' ).data( 'opened', false );
		if( callback ) {
			if( supportTransitions ) {
				$container.on( transEndEventName, function() {
					$( this ).off( transEndEventName );
					callback.call();
				} );
			}
			else {
				callback.call();
			}
		}

	}

	return { init : init };

})();