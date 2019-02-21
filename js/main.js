/*
	Name: uCard
	Description: Responsive HTML5 vCard Template
	Version: 1.1
	Author: pixelwars
*/

(function($) { "use strict"; 
	
	
	/* global variables */
	var portfolioKeyword = "",
		gallery = $('.cd-gallery'),
		foldingPanel = $('.cd-folding-panel'),
		mainContent = $('.cd-main');
	var porftolioSingleActive = false;
	var porftolioSingleJustClosed = false;
	
	
	
	/* DOCUMENT LOAD */
	$(function() {
		
		
		
		// SET BG IMAGES
		$('.header').css("background-image", "url(" + $('.header-wrap > img').attr('src') + ")");  
		$('.cd-item').each(function(index, element) {
            $(this).css("background-image", "url(" + $(this).find('img').attr('src') + ")"); 
        }); 
		
		
		// ------------------------------
		// start loader
		showLoader();
		// ------------------------------
		
		
		// ------------------------------
		// ONE PAGE LAYOUT FUNCTIONS
		if($('html').hasClass('one-page-layout')) {
		
		
			// add hash to links
			$('.cd-gallery li').each(function(index, element) {
				
				var menu_link = $(this).find('a');
				var file_url = menu_link.attr("href");
				var slug = menu_link.data("slug");
				
				if(slug !== undefined)
				{
					menu_link.attr('href', '#/' + slug);
				}
				menu_link.data('file-url', file_url);
				
			});
			
			/* close folded panel by clicking X icon */
			foldingPanel.on('click', '.cd-close', function(event){
				closePage();
				event.preventDefault();
			});
			
			// close folded panel when mouse clicked outside of the panel
			gallery.on('click', function(event){
				if($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0 ) { 
					closePage();
					event.preventDefault();
					}
			});
			
			
			// PORTFOLIO DETAILS
			// if url contains a portfolio detail url
			portfolioKeyword = $('#portfolio-link').data('slug');
			
			// FULL BROWSER BACK BUTTON SUPPORT 
			$.address.change(function() {
				console.log('addres changed');
				setActivePage();
				var detailUrl = giveDetailUrl();
				if(detailUrl !== -1 ) {
					showProjectDetails(detailUrl);
				} else {
					// if url contains portfolio keyword
					if ($.address.path().indexOf("/"+ portfolioKeyword) !== -1) { 
						if(porftolioSingleActive) {
							hideProjectDetails(true,false);
							porftolioSingleJustClosed = false;
							
							if($('.cd-fold-content').is(':empty')) {
								setActivePage();
							}
						} 
					}
				}
			});
			
		}
		// ------------------------------
		
		
		
		// ------------------------------
		// HOME TEXT TYPE EFFECT 
		var typist;
		typist = document.querySelector("#typist-element");
		new Typist(typist, {
		  letterInterval: 60,
		  textInterval: 3000
		});
		// ------------------------------
		
		
		
		// ------------------------------
		// HEADER FUNCTIONS 
		$('.search-toggle').on("click", function() {
            $('html').toggleClass('is-search-toggled-on');
			$('.header-search').stop().slideToggle(300);
			$( ".header-search input" ).trigger( "focus" );
        });
		// ------------------------------
		
		
		
		// ------------------------------
		// remove click delay on touch devices
		FastClick.attach(document.body);
		// ------------------------------	
		
		
		
		
		// ------------------------------
		// SETUP
		setup();
		// ------------------------------
		
        
		
		
		// ------------------------------
		// MOUSE SCROLL ANIMATION
		var middle = $('.site-middle');
		$('.mouse-scroll').on( "click", function() {
			$('body,html').animate(
				{
				'scrollTop': middle.offset().top
				}, 500 );
			return false;
		});	
		// ------------------------------
		
		
		
		
		// ------------------------------
		// FIX LAYOUT 
		
		fixHeader();
		fixBoxes();
		equalheight('.page-bottom .row > div');
		$( window ).resize(function() {
		   
		   if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
			   fixHeader();
			   fixBoxes();
			}
		   equalheight('.page-bottom .row > div');
		});
		// ------------------------------

		
		
	});
	// DOCUMENT READY
	


	
	// WINDOW ONLOAD
	window.onload = function() {
		
		equalheight('.page-bottom .row > div');
		hideLoader();
		
		// ------------------------------
		// ONE PAGE LAYOUT FUNCTIONS
		if($('html').hasClass('one-page-layout')) {
			
			// SET ACTIVE PAGE - load from hash if exists
			setActivePage();
			
		}
		
	};
	// WINDOW ONLOAD	
	
	
	
	 
	
	// ------------------------------
	// ------------------------------
	// FUNCTIONS
	// ------------------------------
	// ------------------------------
	
	
	
	// ------------------------------
	// FIX BOXES
	function fixBoxes() {
		var boxes = $('.cd-item');
		boxes.height(Math.round($(window).height() / 2));
	}
	// ------------------------------
	
	
	
	
	// ------------------------------
	// EQUAL HEIGHT
	function equalheight(container) {
		
		var currentTallest = 0,
			 currentRowStart = 0,
			 rowDivs = new Array(),
			 $el,
			 topPosition = 0,
			 currentDiv = 0;
	
		// don't apply on mobile
		if($( 'html' ).width() < 976) {
		  
		   $(container).css('height', 'auto');
			
			
		} else {
		 $(container).each(function() {
		
		   $el = $(this);
		   $($el).height('auto')
		   topPosition = $el.position().top;
		
		   if (currentRowStart != topPosition) {
			 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			   rowDivs[currentDiv].height(currentTallest);
			 }
			 rowDivs.length = 0; // empty the array
			 currentRowStart = topPosition;
			 currentTallest = $el.height();
			 rowDivs.push($el);
		   } else {
			 rowDivs.push($el);
			 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		  }
		   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			 rowDivs[currentDiv].height(currentTallest);
		   }
		 });
		} // else
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// FIX HEADER
	function fixHeader() {
		var middle = $('.one-page-layout .site-middle'),
			header = $('.one-page-layout .header');
		header.css('height', $(window).height() +'px');	
		middle.css('margin-top', $(window).height() +'px');	
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// SETUP : plugins
	function setup() {
		
		// MASONRY
		setupMasonry();
		
		// LIGHTBOX
		setupLightbox();

		// FILL SKILL BARS
		fillBars();

		// PORTFOLIO SINGLE AJAX
		setupAjax();
		
		// FORMS
		setupForms();
		
		// CONTACT FORM
		setupContactForm();
		
		// MAP
		setupMap();
		
		// TABS
		tabs();
		
		// TOGGLES
		toggles();
		
		// FLUID MEDIA
		fluidMedia();
	
	}
	// ------------------------------
		
	
	
	// ------------------------------
	// PORTFOLIO SINGLE AJAX
	function setupAjax() {
		
		// PORTFOLIO DETAILS
		// Show details
		$(".one-page-layout a.ajax").on('click',function(event) {
			
			event.preventDefault();

			var url = $(this).attr('href');
			var baseUrl = $.address.baseURL();
			var detailUrl = '';
			
			if(url.indexOf(baseUrl) !== -1) { // full url
				var total = url.length;
				detailUrl = url.slice(baseUrl.length+1, total);	
				$.address.path('/' + detailUrl );
			} else { // relative url
				detailUrl = url;
				$.address.path(portfolioKeyword + '/' + detailUrl );
			}
			
		});
			
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// SET ACTIVE PAGE
	function setActivePage() {
		
		var path = $.address.path();
		path = path.slice(1, path.length);
		
		// if hash tag doesnt exists - close page
		if(path == "") {  
			closePage();
			}
		else { // show page change animation
			// change page only if url doesn't target portfolio single page
			if(porftolioSingleJustClosed) {
				porftolioSingleJustClosed = false;
			} else {
				if (giveDetailUrl() === -1){
					var new_url = $( 'a[data-slug=' + path + ']' ).data('file-url');
					showPage(new_url);
				}
			}
			
		}
		
	}	
	// ------------------------------
		

		
		
	// ------------------------------
	// MASONRY - ISOTOPE
	function setupMasonry() {
		
		var masonry = $('.masonry, .gallery');
		if (masonry.length) {
			masonry.each(function(index, el) {
				
				// call isotope
				refreshMasonry();
				$(el).imagesLoaded(function() {
					$(el).isotope({
					  layoutMode : $(el).data('layout') ? $(el).data('layout') : 'masonry'
					});
					// set columns
					refreshMasonry();
				});
				
				// filters
				if (!$(el).data('isotope')) {
					var filters = $(el).siblings('.filters');
					if(filters.length) {
						filters.find('a').on("click", function() {
							var selector = $(this).attr('data-filter');
							  $(el).isotope({ filter: selector });
							  $(this).parent().addClass('current').siblings().removeClass('current');
							  return false;
						});
					}
				}
				
			}); //each			
			$(window).on('resize debouncedresize', function() {
				refreshMasonry();
			});
		}
	}
	// ------------------------------
		
	// ------------------------------
	// REFRSH MASONRY - ISOTOPE
	function refreshMasonry() {
		
		var masonry = $('.masonry');
		if (masonry.length) {
			masonry.each(function(index, el) {
				
				// check if isotope initialized
				if ($(el).data('isotope')) {
					
					var itemW = $(el).data('item-width');
					var containerW = $(el).width();
					var items = $(el).children('.hentry');
					var columns = Math.round(containerW/itemW);
				
					// set the widths (%) for each of item
					items.each(function(index, element) {
						var multiplier = $(this).hasClass('x2') && columns > 1 ? 2 : 1;
						var itemRealWidth = (Math.floor( containerW / columns ) * 100 / containerW) * multiplier ;
						$(this).css( 'width', itemRealWidth + '%' );
					});
				
					var columnWidth = Math.floor( containerW / columns );
					
					$(el).isotope( 'option', { masonry: { columnWidth: columnWidth } } );
					$(el).isotope('layout');
					}
				
			}); //each
		}
		
	}	
	// ------------------------------
	
	
	
	
	
	
	// ------------------------------
	// LIGHTBOX - applied to porfolio and gallery post format
	function setupLightbox() {	
		
		if($(".lightbox, .gallery").length) {
			
			$('.media-box, .gallery').each(function(index, element) {
				var $media_box = $(this);
				$media_box.magnificPopup({
				  delegate: '.lightbox, .gallery-item a',
				  type: 'image',
				  image: {
					  markup: '<div class="mfp-figure">'+
								'<div class="mfp-close"></div>'+
								'<div class="mfp-img"></div>'+
							  '</div>' +
							  '<div class="mfp-bottom-bar">'+
								'<div class="mfp-title"></div>'+
								'<div class="mfp-counter"></div>'+
							  '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button
					
					  cursor: 'mfp-zoom-out-cur', // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor. 
					  verticalFit: true, // Fits image in area vertically
					  tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
					},
					gallery: {
					  enabled:true,
					  tCounter: '<span class="mfp-counter">%curr% / %total%</span>' // markup of counter
					},
				  iframe: {
					 markup: '<div class="mfp-iframe-scaler">'+
								'<div class="mfp-close"></div>'+
								'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
								'<div class="mfp-title">Some caption</div>'+
							  '</div>'
				  },
				  mainClass: 'mfp-zoom-in',
				  tLoading: '',
				  removalDelay: 300, //delay removal by X to allow out-animation
				  callbacks: {
					markupParse: function(template, values, item) {
						  var title = "";
						  if(item.el.parents('.gallery-item').length) {
							  title = item.el.parents('.gallery-item').find('.gallery-caption').text();	  
						  } else {
							  title = item.el.attr('title') == undefined ? "" : item.el.attr('title');
							  }
						  //return title;
					 	values.title = title;
					},
					imageLoadComplete: function() {
					  var self = this;
					  setTimeout(function() {
						self.wrap.addClass('mfp-image-loaded');
					  }, 16);
					},
					close: function() {
					  this.wrap.removeClass('mfp-image-loaded');
					},
					beforeAppend: function() {
						var self = this;
						this.content.find('iframe').on('load', function() {
						  setTimeout(function() {
							self.wrap.addClass('mfp-image-loaded');
						  }, 16);
						});
					 }
				  },
				  closeBtnInside: false,
				  closeOnContentClick: true,
				  midClick: true
				});
			});	
		}
		
	}
	// ------------------------------
	
	
	// ------------------------------
	// FILL PROGRESS BARS
	function fillBars() {
		
		var bar = $('.bar');
		if (bar.length) {
			$('.bar').each(function() {
				 var bar = $(this);
				 var percent = bar.attr('data-percent');
				 bar.find('.progress').css('width', percent + '%' ).html('<span>'+percent+'</span>');
				});
		}
			
	}	
	// ------------------------------	
	
	
	// ------------------------------
	// TABS
	function tabs() {
		
		var tabs = $('.tabs');
		if (tabs.length) {
		
			$('.tabs').each(function() {
				if(!$(this).find('.tab-titles li a.active').length) {
					$(this).find('.tab-titles li:first-child a').addClass('active');
					$(this).find('.tab-content > div:first-child').show();
				} else {
					$(this).find('.tab-content > div').eq($(this).find('.tab-titles li a.active').parent().index()).show();	
				}
			});
			
			$('.tabs .tab-titles li a').on("click", function() {
				if($(this).hasClass('active')) { return; }
				$(this).parent().siblings().find('a').removeClass('active');
				$(this).addClass('active');
				$(this).parents('.tabs').find('.tab-content > div').hide().eq($(this).parent().index()).show();
				return false;
			});
			
		}
		
	}	
	// ------------------------------	
	
	
	// ------------------------------
	// TOGGLES
	function toggles() {
		
		if ($('.toggle').length) {
			
			var toggleSpeed = 300;
			$('.toggle h4.active + .toggle-content').show();
		
			$('.toggle h4').on("click", function() {
				if($(this).hasClass('active')) { 
					$(this).removeClass('active');
					$(this).next('.toggle-content').stop(true,true).slideUp(toggleSpeed);
				} else {
					
					$(this).addClass('active');
					$(this).next('.toggle-content').stop(true,true).slideDown(toggleSpeed);
					
					//accordion
					if($(this).parents('.toggle-group').hasClass('accordion')) {
						$(this).parent().siblings().find('h4').removeClass('active');
						$(this).parent().siblings().find('.toggle-content').stop(true,true).slideUp(toggleSpeed);
					}
					
				}
				return false;
			});
			
		}
		
	}	
	// ------------------------------	
	
	
	// ------------------------------
	// FLUID MEDIA
	function fluidMedia() {
		
		if($('iframe,video').length) {
			$("html").fitVids();
		}
		
	}	
	// ------------------------------
	
	
	
	// ------------------------------
	// SETUP FORMS : FORM VALIDATION
	function setupForms() {
		
		
		// comment form validation fix
		if ($('#commentform').length) {
		
			$('#commentform').addClass('validate-form');
			$('#commentform').find('input,textarea').each(function(index, element) {
				if($(this).attr('aria-required') == "true") {
					$(this).addClass('required');
				}
				if($(this).attr('name') == "email") {
					$(this).addClass('email');
				}
			});
		}
		
		// validate form
		if($('.validate-form').length) {
			$('.validate-form').each(function() {
					$(this).validate();
				});
		}
		
	}	
	// ------------------------------	
	
	
	// ------------------------------
	// SETUP CONTACT FORM
	function setupContactForm() {
		
		var contactForm = $( '#contact-form' );
		if (contactForm.length) {
		
			var $alert = $('.site-alert');
			var $submit = contactForm.find('.submit');
			
			contactForm.submit(function()
			{
				if (contactForm.valid())
				{
					NProgress.start();
					$submit.addClass("active loading");
					var formValues = contactForm.serialize();
					
					$.post(contactForm.attr('action'), formValues, function(data)
					{
						if ( data == 'success' ) {
							contactForm.clearForm();
						}
						else {
							$alert.addClass('error');
						}
						NProgress.done();
						$alert.show();
						setTimeout(function() { $alert.hide(); },6000)
					});
				}
				return false
			});
	
			$.fn.clearForm = function() {
			  return this.each(function() {
			    var type = this.type, tag = this.tagName.toLowerCase();
			    if (tag == 'form')
			      return $(':input',this).clearForm();
			    if (type == 'text' || type == 'password' || tag == 'textarea')
			      this.value = '';
			    else if (type == 'checkbox' || type == 'radio')
			      this.checked = false;
			    else if (tag == 'select')
			      this.selectedIndex = -1;
			  });
			};
		}
		
	}	
	// ------------------------------
	
	
	
	// ------------------------------
	// SETUP MAP : GOOGLE MAP
	/*
		custom map with google api
		check out the link below for more information about api usage
		https://developers.google.com/maps/documentaztion/javascript/examples/marker-simple
		
	*/
	function setupMap() {
			
		var mapCanvas = $('#map-canvas');
		
		if(mapCanvas.length) {
			var latitude = mapCanvas.data("latitude");
			var longitude = mapCanvas.data("longitude");
			var zoom = mapCanvas.data("zoom");
			var marker_image = mapCanvas.data("marker-image");
			
			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
				
				// How zoomed in you want the map to start at (always required)
				zoom: zoom,
				
				// disable zoom controls
				disableDefaultUI: true,

				// The latitude and longitude to center the map (always required)
				center: new google.maps.LatLng(latitude,longitude),
				
				// How you would like to style the map. 
				// custom map styles from : https://snazzymaps.com/
				// This is where you would paste any style found on Snazzy Maps.
				styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
			};

			// Get the HTML DOM element that will contain your map 
			// We are using a div with id="map" seen below in the <body>
			var mapElement = document.getElementById('map-canvas');
			//var mapElement = $('#map-canvas');
			//var myLatlng = new google.maps.LatLng(mapElement.data("latitude"),mapElement.data("longitude"));
			
			// Create the Google Map using our element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);

			//CREATE A CUSTOM PIN ICON
			var marker_image = marker_image;
			var pinIcon = new google.maps.MarkerImage(marker_image,null,null, null,new google.maps.Size(120, 90));    
		
			var marker = new google.maps.Marker({
			   position: new google.maps.LatLng(latitude,longitude),
			  map: map,
			  icon: pinIcon,
			  title: 'Hey, I am here'
			});
		}
		
	}	
	// ------------------------------	
	
	
	
	
	// ------------------------------
	// AJAX PORTFOLIO DETAILS
	var pActive;
	
	function showProjectDetails(url) {
		
		
		porftolioSingleJustClosed = true;
		porftolioSingleActive = true;
		
		showLoader();
		
		var p = $('.p-overlay:not(.active)').first();
		pActive = $('.p-overlay.active');
		
		// ajax : fill data
		p.empty().load(url + ' .portfolio-single', function() {	
			
			NProgress.set(0.5);
			
			// wait for images to be loaded
			p.imagesLoaded(function() {
				
				hideLoader();
				
				if(pActive.length) {
					hideProjectDetails();	  
				}
				
				$('html').addClass('p-overlay-on');
				$("body").scrollTop(0);
								
				// setup plugins
				setup();
				
				p.removeClass('animate-in animate-out').addClass('animate-in').show();
				p.addClass('active');
				
			});
		});
	}
	
	function hideProjectDetails(forever, safeClose) {
		
		porftolioSingleJustClosed = true;
		
		// close completely by back link.
		if(forever) {
			pActive = $('.p-overlay.active');
			
			$('html').removeClass('p-overlay-on');
			
			if(!safeClose) {
				// remove detail url
				$.address.path(portfolioKeyword);
			}
		}
		
		pActive.removeClass('active animate-in animate-out').addClass('animate-out').show();	
		setTimeout(function() { pActive.hide().removeClass('animate-out').empty(); } ,550);
		
	}
	
	function giveDetailUrl() {
	
		var address = $.address.value();
		var detailUrl;
		
		if (address.indexOf("/"+ portfolioKeyword + "/")!=-1 && address.length > portfolioKeyword.length + 2 ) {
			var total = address.length;
			detailUrl = address.slice(portfolioKeyword.length+2,total);
		} else {
			detailUrl = -1;	
		}
		return detailUrl;
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// AJAX LOADER
	function showLoader() {
		NProgress.start();
	}
	function hideLoader() {
		NProgress.done();
	}
	// ------------------------------
	
	
	
	
	// ------------------------------	
	// SHOW PAGE
	function showPage(url) {
		
		showLoader();
		
		var mq = viewportSize();
		
		/* if content is visible above the .cd-gallery - scroll before opening the folding panel */
		if( gallery.offset().top > $(window).scrollTop() && mq != 'mobile') {
			$('body,html').animate({
				'scrollTop': gallery.offset().top
			}, 100, function(){ 
				showPageContent(url);
			});
		}	
		/* if content is visible below the .cd-gallery - scroll before opening the folding panel */	 
		 else if( gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height()  && mq != 'mobile' ) {
			
			$('body,html').animate({
				'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
			}, 100, function(){ 
				showPageContent(url);
			});
		} else {
			showPageContent(url);
		}
	}	
	
	// CLOSE PAGE
	function closePage() {
		
		//console.log('closePage');
		
		$.address.path('');
		
		// check if local
		if(!(window.location.href.indexOf("file://") > -1)) {
		   history.pushState("", document.title, window.location.pathname);
		}
			
		// close folded panel	
		var mq = viewportSize();
		foldingPanel.removeClass('is-open');
		mainContent.removeClass('fold-is-open');
		
		(mq == 'mobile' || $('.no-csstransitions').length > 0 ) 
			/* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
			? $('body').removeClass('overflow-hidden')
			
			: mainContent.find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
				mainContent.find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			});

	}
	
	// show page content
	function showPageContent(url) {
		
		/* OPEN PANEL : load and show new content */
		var foldingContent = foldingPanel.find('.cd-fold-content');
		foldingContent.load(url+' .page-single > *', function(event){
			
			// wait for images to be loaded
			foldingContent.imagesLoaded(function() {
				
				hideLoader();
				setup();
				$('body').addClass('overflow-hidden');
				foldingPanel.addClass('is-open');
				mainContent.addClass('fold-is-open');
				foldingContent.scrollTop(0);
				
			});
			
		});
	
	}
	
	// viewport size
	function viewportSize() {
		/* retrieve the content value of .cd-main::before to check the actua mq */
		return window.getComputedStyle(document.querySelector('.cd-main'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	}
	// ------------------------------


	


})(jQuery);