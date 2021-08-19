function validate_form(form)
{
	console.log('.');
	inps = $(form).find('input, select, textarea');

	submit = true;

	$.each(inps, function(key,item) {
		if ( $(item).prop("required") )
		{
			$(item).toggleClass('alert', false);
			if ( !$(item)[0].checkValidity() ) {
				$(item).toggleClass('alert', true);
				event.preventDefault();
				submit = false;
			}
		}
	});

	return submit;
}

function scrollTo(elem){
	if ($(elem).length > 0)
	{
		/*
		 *	Отмена предыдущего скроллинга
		 */
		if ( typeof scrollingTo != 'undefined' ) {
				clearInterval(scrollingTo);
		}
		scrollStart = $(document).scrollTop();

		scrollFinish = $(elem).offset().top;

		scrollingToTime = 0;
		fps = 30;
		scrollingToMaxTime = .5;
		scrollingTo = setInterval(function() {
			if(scrollingToTime >= fps) {
				clearInterval(scrollingTo);
			}
			newScroll = scrollStart + (scrollFinish - scrollStart) * scrollingToTime / fps;
			// $(document).scrollTop(newScroll);
			$('html').scrollTop(newScroll);
			scrollingToTime++;
		},1000*scrollingToMaxTime/fps);
	}		
}

function get_GET()
{
	tmp_GET = location.search.replace(/^[\?]+|[\?]+$/g, "");
	tmp_GET = tmp_GET.split('&');

	_GET = [];
	$.each(tmp_GET, function(i,val)
	{
		val = val.split('=');
		_GET[val[0]] = val[1];
	});

	if ( _GET['filter'] == undefined || typeof(_GET['filter']) == 'function' )
	{
		_GET['filter'] = 1;
	}

	return _GET;
}

function tab_change(elem)
{
	tabs = $( elem ).closest('.tabs').find('.tabs__title').toggleClass( 'act', false );
	tabs.toggleClass( 'tabs__title_act', false );
	$( elem ).toggleClass( 'tabs__title_act', true );
	tab_i = tabs.index( elem );
	tab_contents = $(elem).closest('section').find('.tabs__content');
	tab_contents.toggleClass('tabs__content_act',false);
	$(tab_contents[tab_i]).toggleClass('tabs__content_act',true);
}

function slider_init(elem,arrows=false,dots=false,infinite=false,center=false, )
{
	elem.css('opacity', 0);
	elem.slick({
		arrows: arrows,
		dots: dots,
		infinite: infinite,
		speed: 400,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
  		autoplaySpeed: 5000,
		// adaptiveHeight: true,
  		centerMode: center,
  		// variableWidth: true
	});
	elem.css('opacity', 1);
}

function grid_slider_init(name, elem, maxwidth)
{
	sliders[name] = false;

	console.log($('body').width());
	if (window.innerWidth <= maxwidth)
	{
		slider_init(elem);
		sliders[name] = true;
	}

	$(window).resize(function() {
		if ( window.innerWidth > 880 && sliders[name])
		{
			elem.slick('unslick');
			sliders[name] = false;
		}
		else if (window.innerWidth <= 880 && !sliders[name])
		{
			slider_init(elem);
			sliders[name] = true;
		}
	});
}


var sliders = {};


jQuery(document).ready(function($) {

	//grid_slider_init('products', $('.products__items'), 880);
	//grid_slider_init('targets', $('.target__items'), 880);
	//grid_slider_init('gis', $('.gis__items'), 880);

	//slider_init($('.portfolio__items'),false,true,false);

	slider_init($('.promo__slider'),true,true,true);


	$('.suppliers__items').slick({
		arrows: false,
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		// adaptiveHeight: true,
  		// centerMode: true,
  		// variableWidth: true
	});

	var slickCount = 6;
	if ($(document).width() < 720) {slickCount = 3} else {slickCount = 6};

 function photo_slider() {
	 	if ($(document).width() < 720) {slickCount = 3} else {slickCount = 6};
	 	$('.photo__main_slider').slick({
			arrows: true,
			dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: $('.arrow-photo.arrow-next'),
			prevArrow: $('.arrow-photo.arrow-prev'),
			asNavFor: '.photo__nav_slider'
		});
		$('.photo__nav_slider').slick({
			arrows: true,
			dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: slickCount,
			slidesToScroll: 1,
			nextArrow: $('.arrow-photo.arrow-nav-next'),
			prevArrow: $('.arrow-photo.arrow-nav-prev'),
			asNavFor: '.photo__main_slider',
			focusOnSelect: true
		});
	 }
	photo_slider();

	 function video_slider() {
	 	if ($(document).width() < 720) {slickCount = 3} else {slickCount = 6};
		$('.video__main_slider').slick({
			arrows: true,
			dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: $('.arrow-video.arrow-next'),
			prevArrow: $('.arrow-video.arrow-prev'),
			asNavFor: '.video__nav_slider',
			swipe: false
		});
		$('.video__nav_slider').slick({
			arrows: true,
			dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: slickCount,
			slidesToScroll: 1,
			nextArrow: $('.arrow-video.arrow-nav-next'),
			prevArrow: $('.arrow-video.arrow-nav-prev'),
			asNavFor: '.video__main_slider',
			focusOnSelect: true
		});
	}
	video_slider();

	$(window).resize(function() {
		if ($(document).width() < 720) {tmpSlickCount = 3} else {tmpSlickCount = 6};
		if ( tmpSlickCount !== slickCount ) {
			$('.photo__main_slider').slick('unslick');
			$('.photo__nav_slider').slick('unslick');
			photo_slider();
			$('.video__main_slider').slick('unslick');
			$('.video__nav_slider').slick('unslick');
			video_slider();
		}
	});

	// $('.video__preview').on('click', function(event)
	// {
	// 	var sourceFile = $(this).closest('.video__wrap').find('.video__frame').attr("data-src");
	// 	console.log(sourceFile);
	// 	$(this).closest('.video__wrap').find('.video__frame').attr("src", sourceFile);
	// 	$(this).closest('.video__wrap').find('.video__preview').css('display', 'none' );
	// 	$(this).closest('.video__wrap').find('.video__play').css('display', 'none' );
	// });
	$('.video__play').on('click', function(event)
	{
		var sourceFile = $(this).closest('.video__wrap').find('.video__frame').attr("data-src");
		console.log(sourceFile);
		$(this).closest('.video__wrap').find('.video__frame').attr("src", sourceFile);
		$(this).closest('.video__wrap').find('.video__preview').css('display', 'none');
		$(this).closest('.video__wrap').find('.video__play').css('display', 'none' );
	});

	$('.arrow-video').on('click', function(event)
	{
		$(this).closest('section').find('.video__frame').attr("src", '');
		$(this).closest('section').find('.video__preview').css('display', '');
		$(this).closest('section').find('.video__play').css('display', '' );
	});


	$('.burger, .nav__open').on('click', function(event)
	{
		$('.mobile.menu').toggleClass('act');
		$('body').toggleClass('noscrolling', true);
		$('.mobile.menu .panel').css('overflow-y', 'scroll');
	});

	$('.mobile.menu .close, .mobile.menu.close').on('click', function(event)
	{
		$('body').toggleClass('noscrolling', false);
		$('.mobile.menu').toggleClass('act', false);
	});

	$('.mobile.menu').on('click', function(event)
	{
		if ( $(event.target).hasClass('close') === true )
		{
			$('.mobile.menu').toggleClass('act', false);
		}
	});

	function reviews_slider(){
		

		$('.reviews__slider').slick({
			arrows: true,
			dots: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			nextArrow: $('.arrow-reviews.arrow-next'),
			prevArrow: $('.arrow-reviews.arrow-prev')
		});
	}
	reviews_slider();


	function videoReviews__slider(){
		

		$('.videoReviews__slider').slick({
			arrows: true,
			dots: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			nextArrow: $('.arrow-videoReviews.arrow-next'),
			prevArrow: $('.arrow-videoReviews.arrow-prev')
		});
	}
	videoReviews__slider();

	$('.tabs__title').on( 'click', function(event) {
		tab_change(this);
	});

	//	ScrollTo
    $('body').on('click', 'a', function(event)
    {
        to = this.href.split('#')[1];
        console.log('#'+to);
        if(to && $('#'+to).length > 0)
        {
        	console.log('#'+to);
            event.preventDefault();
            scrollTo( '#'+to );
        }
    });

	$('.menu_toggle').on('click', function(event)
    {
    	if (!$(this).hasClass('menu_toggle__act'))
    	{
    		menu = $(this).closest('.menu_wrap').find('.menu_list');
	        $(menu).show(350);
	        $(this).toggleClass('menu_toggle__act',true);
    	} else {
    		menu = $(this).closest('.menu_wrap').find('.menu_list');
	        $(menu).hide(350);
	        $(this).toggleClass('menu_toggle__act',false);
    	}
        
    });


    
	$('.ajax').on('submit', function(event) {
		event.preventDefault();
		let method = $(this).data('method');
		//console.log(method);
		url = '/compilation/mail/'+method;

		gtag('event', 'callback_submit', {
			'value' : 0
		});
		console.log(1);
		ym(56810359,'reachGoal','callback_submit');

		ajax(
			url,
			function(data) {
				console.log(data);
				popup_open('complete');
				popup_close(event.target,true);
				$(event.target).closest('form')[0].reset();

				gtag('event', 'callback_success', {
					'value' : 1
				});
				console.log(2);
				ym(56810359,'reachGoal','callback_success');
			},
			formData = new FormData(this)
		);

	});


	$('.more').on('click', function(event) {
		moreList = $(this).closest('section').find('.item.d-n');
		//console.log(moreList);
		for (var i = 0; i < 4; i++)
		{
			if ( moreList[i] != undefined )
			{
				$(moreList[i]).toggleClass('d-n',false);
			}
			else
			{
				$(this).toggleClass('d-n',true);
			}
		}	
	});

	$(document).scroll(function(){
	});
});