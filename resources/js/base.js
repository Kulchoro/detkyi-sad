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

	$('.anim-group-in-r')/*.addClass('hidden')*/.viewportChecker({
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
					$(val).toggleClass('fadeInRight');
				}, 300*isum);
			});
		}
	});




	/*$(function(){
		$(".phonemask").mask("+7(999) 999-9999");
	});*/
	$(function(){
		$( 'input[type=tel]' ).mask("+7(999) 999-9999",{autoclear: false});
	});

	$.fn.setCursorPosition = function(pos) {
	  if ($(this).get(0).setSelectionRange) {
	    $(this).get(0).setSelectionRange(pos, pos);
	  } else if ($(this).get(0).createTextRange) {
	    var range = $(this).get(0).createTextRange();
	    range.collapse(true);
	    range.moveEnd('character', pos);
	    range.moveStart('character', pos);
	    range.select();
	  }
	};

	function getCaretPosition(ctrl) {
		if (document.selection) {
		    ctrl.focus();
		    var range = document.selection.createRange();
		    var rangelen = range.text.length;
		    range.moveStart('character', -ctrl.value.length);
		    var start = range.text.length - rangelen;
		    return {
		        'start': start,
		        'end': start + rangelen
		    };
		} else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
		    return {
		        'start': ctrl.selectionStart,
		        'end': ctrl.selectionEnd
		    };
		} else {
		    return {
		        'start': 0,
		        'end': 0
		    };
		}
	}

	$('input[type="tel"]').click(function(){
		var check = $(this).val();
		//console.log(check);
		var rng = getCaretPosition(this)['start'];
		val = check.split('_')[0];
		posVal = val.length;
		if (check == '+7(___) ___-____' || rng == 0 || rng == 1 || rng == 2 ) {
			$(this).setCursorPosition( 3 );
		} else {
			//console.log(rng,posVal);
			if (rng > posVal) {
				$(this).setCursorPosition( posVal );
			}
		}
	});
	function checkKeyPress(key){
		//console.log(event.key);
		return event.key;
	}
	$('input[type="tel"]').keydown(function(event){
		var button = checkKeyPress(event);
		if (button == 'ArrowLeft' || button == 'ArrowRight' ) {
			check = $(this).val();
			//console.log(check);
			rng = getCaretPosition(this)['start'];
			val = check.split('_')[0];
			if (check == '+7(___) ___-____') {
				$(this).setCursorPosition( 3 );
			} else {
				posVal = val.length;
				if (button == 'ArrowRight') {
					posVal = val.length - 1;
				}
				//console.log(rng,posVal);
				if ( (rng > posVal) ) {
					$(this).setCursorPosition( posVal );
				}
			}
			//console.log(button,check,rng,val.length );
			if ( rng <= 4 && button !== 'ArrowRight' ) {
				$(this).setCursorPosition( 3 );
			}
		}
	});
});