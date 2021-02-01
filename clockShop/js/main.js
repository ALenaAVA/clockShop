let user_icon = $('.user-header__icon');
let user_menu = $('.user-header__menu');

user_icon.click(function (e) {	
	user_menu.toggleClass('active');
});

$(document).click(function (e) {
		
	if (!e.target.closest('.user-header')) {
		user_menu.removeClass('active');
	}
	
})
//Adaptive: functions
$(window).resize(function (event) {
	adaptive_function();
});
function adaptive_header(w, h) {



	var headerRegion = $('.actions-header__region');
	var move = headerRegion.data('move').split(',');
	var headerMenu = $('.' + move[0]);

	if (w < move[1]) {
		if (!headerRegion.hasClass('done')) {
			headerRegion.addClass('done').appendTo(headerMenu);
		}
	} else {
		if (headerRegion.hasClass('done')) {
			headerRegion.removeClass('done').prependTo($('.header__actions'));
		}
	}
}

function adaptive_function() {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	adaptive_header(w, h);
}
adaptive_function();
function map(n) {
	google.maps.Map.prototype.setCenterwithOffset = function (latlng, offsetX, offsetyY) {
		var map = this;
		var ov = new google.maps.OverlayView();
		ov.onAdd = function () {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x + offsetX;
			aPoint.y = aPoint.y + offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatlLng(aPoint)};
		}
		ov.draw = function () { };
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset newgoogle.maps.Size(230,250)
	});
	var locations = [
		[new google.maps.LatLng(53.819055, 27.8813694)]
	];
	var options = {
		zoom: 10,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		scrollwheel: false,
		mapTypeld: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), options);
	var icons = {
		url: 'img/icons/map.svg',
		scaledSize: new google.maps.Size(18, 20),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			// icon ican,
			position: locations[i][0],
			map: map,
		});
	
		markers.push(marker);
	}
}
if ($('#map').length > 0) {
	map();
}

function forms() {

	$('input,textarea').focus(function () {
		if ($(this).val() == $(this).attr('data-value')) {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).attr('data-type') == 'pass') {
				$(this).attr('type', 'password');
			}
			$(this).val('');
		}
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function () {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			} else {
				this.value = $(this).attr('data-value');
			}
		}
		if (this.value != $(this).attr('data-value') && this.value != '') {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}

		$(this).click(function () {
			if (this.value == $(this).attr('data-value')) {
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'password');
				}
				this.value = '';
			}
		});
		$(this).blur(function () {
			if (this.value == '') {
				if (!$(this).hasClass('l')) {
					this.value = $(this).attr('data-value');
				}
				$(this).removeClass('focus');
				$(this).parent().removeClass('focus');
				if ($(this).attr('data-type') == pass) {
					$(this).attr('type', 'text');
				}
			}
			if ($(this).hasClass('vn')) {
				formValidate($(this));
			}
		});
	});
	$('.form-input__viewpass').click(function (event) {
		if ($(this).hasClass('active')) {
			$(this).parent().find('input').attr('type', 'password');
		} else {
			$(this).parent().find('input').attr('type', 'text');
		}
		$(this).toggleClass('active');
	});
}
forms();


$('form button[type=submit]').click(function () {
	var er = 0;
	var form = $(this).parents('form');
	var ms = form.data('ms');
	$.each(form.find('.req'), function (index, val) {
		er += formValidate($(this));
	});
	if (er == 0) {
		removeFormError(form);

		if (ms != null && ms != '') {
			showMessageByClass(ms);
			return false;
		}
	} else {
		return false;
	}
});
function formValidate(input) {
	var er = 0;
	var form = input.parents('form');
	if (input.attr('name') == 'email' || input.hasClass('email')) {
		if (input.val() != input.attr('data-value')) {
			var em = input.val().replace(' ', '');
			input.val(em);
		}
		if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val()))||input.val()==input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	} else {
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	}
	if (input.attr('type')=='checkbox') {
		if (input.prop('checked') == true) {
			input.removeClass('err').parent().removeClass('err');
		} else {
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if (input.hasClass('name')) {
		if (!(/^[А-Яа-яa-zA-Z-]+([А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
			er++;
			addError(input);
		}
	}
	if (input.hasClass('pass-2')) {
		if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
			addError(input);
		} else {
			removeError(input);
		}
	}
	return er;
}
function formLoad() {
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class= "popup-loading"><div class="popup-loading__title">Loading...</div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms) {
	$('.popup').hide();
	popupOpen('message.' + ms, '');
}
function showMessage(html) {
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form) {
	$.each(form.find('.input'), function (index, val) {
		$(this).removeClass('focus').val($(this).data('value'));
		$(this).parent().removeClass('focus');
		if ($(this).hasClass('phone')) {
			maskclear($(this));
		}
	});
}
function addError(input) {
	input.addClass('err');
	input.parent().addClass('err');
	input.parent().find('.form__error').remove();
	if (input.hasClass('email')) {
		var error = '';
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			error = input.date('error');
		} else {
			error = input.date('error');
		}
		if (error != null) {
			input.parent().append('<div class="form__error">' + error + '</div>');
		}
	} else {
		if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
			input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
		}
	}
	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find(".selsct").addClass('err');
	}
}
function addErrorByName(form,input__name,error_text) {
	var input = form.find('[name=]"' + input__name + '"]');
	input.attr('data-error', error_text);
	addError(input);
}
function addFormError(form,error_text) {
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form) {
	form.find('.form__generalerror').hide().html('');
}
function removeError(input) {
	input.removeClass('.error');
}















































































































$(document).ready(function () {
	$('.wrapper').addClass('loaded');

	$('.icon-menu').click(function (event) {
		$(this).toggleClass('active');
		$('.menu__body').toggleClass('active');
		if ($(this).hasClass('active')) {
			$('body').data('scroll', $(window).scrollTop());
		}
		$('body').toggleClass('lock');
		if (!$(this).hasClass('active')) {
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	});
});

(function ibg() {
	$.each($('._ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
})();
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}

			let slider_content = slider.innerHTML;

			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';

			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');
		}

		if (slider.classList.contains('_gallery')) {
			//slider.data('LightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}
function sliders_bild_callback(params) { }



let slider_about = new Swiper('.main-slider__body', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBeetween: 0,
	//autoHeight: true,
	//speed: 800,
	loop: true,
	
	navigation: {
		nextEl: '.control-main-slider__arrow_next',
		prevEl: '.control-main-slider__arrow_prev',
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBeetween: 0,
			autoHeight:true,
		}
	},

	// on: {
	// 	lazyImageReady: function () {
	// 		ibg();
	// 	},
	// },
});
