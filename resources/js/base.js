/*
 *	Открытие и Закрытие встплывающих окон
 */
function popup_open(id) {
	$('#'+id+'.popup').toggleClass('popup_act',true);
	console.log( $('#'+id+'.popup') );
	$('body').toggleClass('noscrolling',true);
}
function popup_close(elem,important=false) {
	if($(elem).closest('.popup__noclose').length == 0 || $(elem).hasClass('popup__close') || important) {
		$($(elem).closest('.popup')).toggleClass('popup_act',false);
		if( $('.popup_act').length < 1 )
		{
			$('body').toggleClass('noscrolling',false);
		}
		return true;
	}
	return false;
}

function ajax(url, callback, formData=null)
{
    console.log('ajax ['+url+']');
    $.ajax({
        url: url,
        type: 'POST',
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            return myXhr;
        },
        success: function (data) {
            callback(data);
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    });
}



jQuery(document).ready(function($) {

	/*
	 *
	 *	БАЗОВЫЙ НАБОР СКРИПТОВ
	 *
	 */


	window.setLocation = function setLocation(curLoc){
		//console.log( location.search );
		try {
			history.pushState(null, null, curLoc);
			return;
		}
		catch(e){}
		//location.search = curLoc;
		location.href = pathname + curLoc;
	}

	 


	$('[data-popup]').on('click', function(event)
	{
		event.preventDefault();
		popup = $(this).data('popup');
		popup_open(popup);
	});
	$('.popup__close').on('click', function(event)
	{
		// event.preventDefault();
		popup_close(event.target);
	});




	// $('.anim-in')/*.addClass('hidden')*/.viewportChecker({
	// 	classToRemove: 'hidden',
	// 	classToAdd: 'animated visible fadeIn',
	// 	offset: -50
	// });
	$('.anim-in-l')/*.addClass('hidden')*/.viewportChecker({
		classToRemove: 'hidden',
		classToAdd: 'animated visible fadeInLeft',
		offset: -50
	});
	$('.anim-in-r')/*.addClass('hidden')*/.viewportChecker({
		classToRemove: 'hidden',
		classToAdd: 'animated visible fadeInRight',
		offset: -50
	});
	$('.anim-in-up')/*.addClass('hidden')*/.viewportChecker({
		classToRemove: 'hidden',
		classToAdd: 'animated visible fadeInUp',
		offset: -50
	});
	$('.anim-in-down')/*.addClass('hidden')*/.viewportChecker({
		classToRemove: 'hidden',
		classToAdd: 'animated visible fadeInDown',
		offset: -50
	});

	$('.anim-group-in')/*.addClass('hidden')*/.viewportChecker({
		offset: -50,
		/*classToRemove: 'hidden',*/
		callbackFunction: function(elem, action){
			chid = 0;
			chelem = [];
			elem.find('.anim-item').each(function() {
				chelem[chid] = this;
				$(this).toggleClass('hidden',true);
				chid++;
			});
			isum = 1;
			$.each(chelem, function(i,val) {
				//console.log(i);
				isum += 1 / (i+1);
				setTimeout(function() {
					$(val).toggleClass('hidden', false);
					$(val).toggleClass('animated');
					$(val).toggleClass('fadeIn');
				}, 300*isum);
			});
		}
	});

	$('.anim-group-in-up')/*.addClass('hidden')*/.viewportChecker({
		offset: -50,
		/*classToRemove: 'hidden',*/
		callbackFunction: function(elem, action){
			chid = 0;
			chelem = [];
			elem.find('.anim-item').each(function() {
				chelem[chid] = this;
				$(this).toggleClass('hidden',true);
				chid++;
			});
			isum = 1;
			$.each(chelem, function(i,val) {
				//console.log(i);
				isum += 1 / (i+1);
				setTimeout(function() {
					$(val).toggleClass('hidden', false);
					$(val).toggleClass('animated');
					$(val).toggleClass('fadeInUp');
				}, 300*isum);
			});
		}
	});

	$('.anim-group-in-l')/*.addClass('hidden')*/.viewportChecker({
		offset: -50,
		/*classToRemove: 'hidden',*/
		callbackFunction: function(elem, action){
			chid = 0;
			chelem = [];
			elem.children('.anim-item').each(function() {
				chelem[chid] = this;
				$(this).toggleClass('hidden',true);
				chid++;
			});
			isum = 1;
			$.each(chelem, function(i,val) {
				//console.log(i);
				isum += 1 / (i+1);
				setTimeout(function() {
					$(val).toggleClass('hidden', false);
					$(val).toggleClass('animated');
					$(val).toggleClass('fadeInLeft');
				}, 300*isum);
			});
		}
	});

	
});