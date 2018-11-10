function ui_init(){
	var url = $(location).attr("search").split("mod=");
	var nm = "#" + url[1];
	$(".js-tab a").each(function(){
		if($(this).attr("target") != "_blank"){
			var $div = $(this).parents(".js-tab-type1").parent();
			var $li = $(this).parent().siblings("li");
			var $id = $(this).attr("href");

			if($id == nm){
				$li.removeClass("on");
				$(this).parent().addClass("on");

				$(".js-tab-con",$div).hide();
				$($id).show();
			}
		}
	});

	$(".js-tab a").click(function(){
		var $div = $(this).parents(".js-tab").parent();
		var $ul = $(this).parents(".js-tab");
		var $li = $(this).parent().siblings("li");
		var $id = $(this).attr("href");

		$li.removeClass("on");
		$(this).parent().addClass("on");

		if($ul.hasClass("only_tab") == 0){
			$(".js-tab-con",$div).hide();
			$($id).show();
			return false;
		}
	});


	$(".chk_area.input_chk label .sub_ico").hover(function(){
		var x = $(this).offset().left,
			y = $(this).offset().top - 5;
		if($("#login_info").hasClass("on") == false){
			$("#login_info").fadeIn(100).addClass("on");
			$("#login_info").css({'left':x,'top':y});
		}
	});


	$("#login_info").mouseleave(function(){
		$("#login_info").hide().removeClass("on");
	});

	$("#login_info .close").click(function(){
		$("#login_info").hide().removeClass("on");
	});


	/*$(".input_chk input").click(function(){
		if($(this).parents(".input_chk").hasClass("radio_input") == false){
			if($(this).is(':checked') == false){
				$(this).parents(".input_chk").removeClass("on");
			}else{
				$(this).parents(".input_chk").addClass("on");
			}
		}else{
			//if($(this).is(':checked') == true){
				var $this = $(this);
				$("input[name="+$this.attr("name")+"]").each(function(){
					$(this).parents(".radio_input ").removeClass("on");
					$this.parents(".input_chk").addClass("on");
				})
			//}
		}
	});*/

	$(".arrow_btn").click(function(){
		$(this).toggleClass("on");
	});

	$(".ico-help").hover(function(){
		var id =  $(this).attr("href");
		var $el = $(this).closest(".lecture-txt").find(id);
		$el.css({"margin-top": "-22px"});
		$el.on("click", function(e) {
			$(this).find(".s-layer-close").on("click", function(e) {
				$(this).closest("#help_layer").hide();
				e.preventDefault();
			});
			e.preventDefault();
		}).show();
	}).mouseleave(function() {
		var id =  $(this).attr("href");
		var $el = $(this).closest(".lecture-txt").find(id);
		var $wrap = $(this).closest(".lecture-txt");
		$wrap.mouseleave(function() {
			$el.hide();
		});
		$el.mouseleave(function() {
			$el.hide();
		});
	}).on("click", function(e) {
		e.preventDefault();
	});

	//미등록
	var signInput = $(".sign-up input");
	signInput.click(function(){
		if($(this).parents(".sign-up").hasClass("on") == false){
			$(this).parents(".sign-up").addClass("on");
		}else{
			$(this).parents(".sign-up").removeClass("on");
		}
	});

	//top 버튼
	if($('.fixed-top').length == 1){
		var _lastScroll = 0;
		$('.fixed-top').stop().animate({ opacity: 0 }, 0);

		$(window).scroll(function(event){
			var _scroll = $(this).scrollTop();

			if ($(window).scrollTop() >= 200){
				$('.fixed-top').stop().animate({ opacity: 1 }, 10);
			}else{
				$('.fixed-top').stop().animate({ opacity: 0 }, 10);
			}
			_lastScroll = _scroll;
		});

		$('.fixed-top').click(function(){
			$('html, body').stop().animate({ scrollTop: 0 }, 600);
			return false;
		});
	}

	$("#event-list-btn").on("click",function(e){
		var infiniteLoop = true;

		if ($(this).data("banner-count") < 4) {
            infiniteLoop = false;
		}

		$('.event-list-bxslider').bxSlider({
			auto: true,
			pager: true,
			slideWidth: 250,
			minSlides:1,
			maxSlides:4,
			autoDelay:10,
			responsive: true,
			moveSlides:1,
			infiniteLoop: infiniteLoop
		});
		e.preventDefault();
	});

	inputCheckbox();
}

/*$(window).scroll(function(){
	if( $(window).scrollTop() > 0){
		$('.dir-top').show();
	} else {
		$('.dir-top').hide();
	}
});*/

var idx = null;
function footer_ui(){
	var $footer_box = $(".js-footer"),
		$footer_li = $($footer_box).find("li"),
		$tab_width = 0;

	$footer_li.each(function(index) {
		var f_position = $(this).position();
		if (f_position.left === 0 && index !== 0) {
			idx = index;
		}
	});

	$footer_li.each(function(index) {
		if($(this).hasClass("on") === true){
			var $id = $(this).find("a").attr("href"),
				$width = 0;
			$($id).show().siblings(".js-tab-con").hide();
			if(index >= idx){
				for(i=0 ; i <= index-idx ; i++){
					$width = $width + $footer_li.eq(index).width();
				}
				$footer_box.animate({
					"margin-left":-$width
				});
			}
		}
	});

	//클릭
	$("a",$footer_box).on("click",function(){
		var $id = $(this).attr("href"),
			lIndex = $footer_li.index($(this).parent()),
			$width = 0;

		$(this).parent().addClass("on").siblings("li").removeClass("on");
		$($id).show().siblings(".js-tab-con").hide();

		if(lIndex >= idx){
			for(i=0 ; i <= lIndex-idx ; i++){
				$width = $width + $footer_li.eq(lIndex).width();
			}
			$footer_box.animate({
				"margin-left":-$width
			});
		}else{
			$footer_box.animate({
				"margin-left":-$width
			})
		}

		return false;
	});

	//ul_width
	$footer_li.each(function(){
		$tab_width = $(this).outerWidth() + $tab_width;
	});
	$footer_box.width($tab_width + 10);
}

function footer_btn(prev){
	$(function() {
		var $footer_box = $(".js-footer"),
			$footer_li = $($footer_box).find("li"),
			$footer_li_length = $footer_li.length - 1,
			$active_li = 0,
			$width = 0;

		$footer_li.each(function () {
			if ($(this).hasClass("on") === true) {
				$active_li = $(this).index();
			}
		});

		if(prev === "prev"){
			if($active_li === 0){
				$active_li = $footer_li_length;
			}else{
				$active_li = $active_li - 1;
			}
		}else if(prev === "next"){
			if($active_li === $footer_li_length){
				$active_li = 0;
			}else{
				$active_li = $active_li + 1;
			}
		}
		var $id = $footer_li.eq($active_li).find("a").attr("href");
		$footer_li.eq($active_li).addClass("on").siblings("li").removeClass("on");
		$($id).show().siblings(".js-tab-con").hide();

		if($active_li >= idx){
			for(i=0 ; i <= $active_li-idx ; i++){
				$width = $width + $footer_li.eq($active_li).width();
			}
			$footer_box.animate({
				"margin-left":-$width
			});
		}else{
			$footer_box.animate({
				"margin-left":-$width
			})
		}
		return false;
	});
};

/*function family_site(){
	/!* family_site 접기 기능 *!/

	var $famBox = $('.family-site-box');
	var $num = $famBox.data('margin');

	$famBox.find('.family_active_btn').click(function(){

		if($famBox.hasClass('active')){
			$famBox.removeClass('active');
			$famBox.animate({'margin-left' : ''},500);

			setCookie('hide_lnb', 0, 1);
		}else{
			$famBox.stop().animate({
				'margin-left' : '-' + $num + 'px'
			},500,function(){
				$famBox.addClass('active');
			});

			setCookie('hide_lnb', 1, 1);
		}
		return false;
	});


	$(".family_list li strong a").click(function(){
		if(!$(this).parent().hasClass('js-no')){
			var li = $(this).parent().parent();
			if(li.hasClass("active") == 1){
				li.find(".family_site_sub").slideUp();
				li.removeClass("active");
			}else{
				$(".family_list > li").find(".family_site_sub").slideUp();
				$(".family_list > li").removeClass("active");
				li.addClass("active");
				li.find(".family_site_sub").slideDown();
			}
			return false;
		}
	});

//Family Site
	$(".js-show-area").mouseleave(function(){
		var btn = $(this).find(">.js-show-btn");
		var list = $(this).find(">.js-show-box");
		if(!btn.hasClass("on")){
			list.hide();
		}
	});
}*/
var familySite = (function () {
	return {
		element: {
			toggleEvtHover: {
				target: '.js_toggle_hover'
			},
			familySite: {
				wrap: '.family-site-wrap',
				wrapClose: '.family-site-wrap.close',
				menu: '.family-site-menu'
			}
		},
		init: function () {
			this.eventInit();
		},
		eventInit: function () {
			this.toggleEvtHover();
			this.familySite();
		},
		toggleEvtHover: function () {
			var lElement = this.element;
			$(lElement.toggleEvtHover.target).mouseover(function () {
				var targetId = $(this).data("id");
				var lthis = $(this);
				var targetContent = $('#' + targetId);

				lthis.addClass('on');
				targetContent.show();
				targetContent.mouseleave(function () {
					lthis.removeClass('on');
					$(this).hide();
				});
			});
			$(lElement.toggleEvtHover.target).on('click', function (e) {
				e.preventDefault();
			});
		},
		familySite: function () {
			var lElement = this.element;
			var wrap = $(lElement.familySite.wrap);
			var wrapClose = $(lElement.familySite.wrapClose);
			var menu = $(lElement.familySite.menu);
			var menuClose = $(lElement.familySite.wrap).find('.family-menu-close');
			var menuOpen = $(lElement.familySite.wrapClose).find('.family-menu-open');


			menu.find('dt').on('click', function (e) {
				e.preventDefault();
				if ($(this).parents('li').hasClass('on')) {
					$(this).next('dd').slideUp(200);
					$(this).parents('li').removeClass('on');
				} else {
					menu.find('li').removeClass('on');
					menu.find('dd').slideUp(200);
					$(this).next('dd').slideDown(200);
					$(this).parents('li').addClass('on');
				}
			});

			function menuOpenfunc() {
				setCookie('_myclass_lnb_hide', 0, 1);
				$('#recentLecture').hide();
				$('.family-site-myInfo .js_toggle_hover').removeClass('on');
				wrap.stop().animate({left: 0}, 200);
				wrapClose.stop().animate({left: '-53px'}, 100);
			}

			function menuClosefunc() {
				setCookie('_myclass_lnb_hide', 1, 1);
				$('#recentLecture').hide();
				$('.family-site-myInfo .js_toggle_hover').removeClass('on');
				wrap.stop().animate({left: '-142px'}, 200);
				wrapClose.stop().animate({left: 0}, 200);
			}


			menuClose.on('click', function (e) {
				menuClosefunc();
			});

			menuOpen.on('click', function (e) {
				menuOpenfunc();
			});

			/* 스크롤로 인한 패밀리사이트 닫기기능 제거
			var scrollAction = true;
			function scrollEvent() {
				$(window).scroll(function () {
					if (scrollAction) {
						var lNowPos = $(this).scrollTop();
						if (lNowPos > $(window).height() * 0.5) {
							menuClosefunc();
							scrollAction = false;
						}
					}
				});
			}
			scrollEvent();
			*/
		}
	}
})();

$(document).ready(function(){
	ui_init();
	footer_ui();
	classroom_list(true);
	//family_site();
	familySite.init();
});

function inputCheckbox(){
	$("[class^='input-sp'] input[type=checkbox]").click(function(){
		if($(this).is(':checked') == false){
			$(this).parents("[class^='input-sp']").removeClass("on");
		}else{
			$(this).parents("[class^='input-sp']").addClass("on");
		}
	});
	$("[class^='input-sp'] input[type=radio]").click(function(){
		var $this = $(this);
		$("input[name="+$this.attr("name")+"]").each(function(){
			$(this).parents("[class^='input-sp']").removeClass("on");
			$this.parents("[class^='input-sp']").addClass("on");
		});
	});
	$(".input-parent").click(function(){
		var $this = $(this);
		if($("[class^='input-sp'] input",this).attr("type") == "checkbox"){
			if($this.hasClass("on") == false){
				$this.addClass("on");
				$("[class^='input-sp']",$this).addClass("on");
				$("[class^='input-sp'] input",$this).prop("checked",true);
			}else{
				$this.removeClass("on");
				$("[class^='input-sp']",$this).removeClass("on");
				$("[class^='input-sp'] input",$this).prop("checked",false);
			}
		}else{
			var $input = $("[class^='input-sp'] input",$this);
			$("input[name="+$input.attr("name")+"]").each(function(){
				$(this).parents(".input-parent").removeClass("on");

				$this.addClass("on");
				$("[class^='input-sp']",$this).addClass("on");
				$("[class^='input-sp'] input",$this).prop("checked",true);
			});
		}
	});
}

function toggle_btn(el,etc){
	$(function(){
		$("."+etc).hide();
		$("#"+el).toggle();
	});
}

function layer_open(el){
	$(function(){
		$("#"+el).show();
	});
}

function layer_close(el){
	$(function(){
		$("#"+el).hide();
	});
}

function wid_open(url,w,h){
	window.open(url, "", "width="+ w +",height="+h+",scrollbars=1");
}

// 단어장페이지
function noteList(){
	var $selectItem = $('#select-item');

	$selectItem.on('change' , function(){
		var value = $selectItem.val(),
			$valueList = $('.vocabulary-note-list-c').find('a').parent();

		if(value == 0){
			$valueList.find('em').show();
			$valueList.find('span').show();
		}
		else if(value == 1){
			$valueList.find('em').show();
			$valueList.find('span').hide();
		}
		else{
			$valueList.find('em').hide();
			$valueList.find('span').show();
		}
	})
}

function noteList_pop(){
	var $selectionList = $('.vocabulary-note-list-c').find('li > a'),
		$selContent = $('.note-list-popup-w');

	$selectionList.on('click' , function(){
		var listIde = $(this).index($selectionList);

		$selContent.eq(listIde).show().find('.note-list-close').click(function(){
			$selContent.eq(listIde).fadeOut();
		});
	})
}

function classroom_list(classclick){
	var $classroom_listBtn = $('.classroom-list-btn'),
		$classroom_listCon = $('.classroom-list-con'),
		classSell = classclick;

	function classRoom_isopen(e){
		if(classSell){
			$classroom_listCon.addClass('on');
		}
		else{
			$classroom_listCon.removeClass('on');
		}
		classSell =! classSell;
		e.preventDefault();
	}
	$classroom_listBtn.click(classRoom_isopen);
}

// 이벤트 레이어팝업
function e_layerPop(el, func) {
	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg'); //dimmed 레이어를 감지하기 위한 boolean 변수
	var id = temp.attr("id");
	var mobile = document.getElementById('is_mobile').value;
	var _pos = $(document).scrollTop();
	var _wh = $(window).outerHeight();

	//if(bg){
	//	$("#"+id).parent().fadeIn();
	//}else{
		temp.fadeIn();
	//}

	// 화면의 중앙에 레이어를 띄운다.
	if(mobile=='N'){
		if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
		else temp.css('top', '0px');
		if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
		else temp.css('left', '0px');
	}else{
		temp.css('margin-top', + ( _wh*0.5 - temp.outerHeight() *0.5 + 20) + 'px' );
		temp.find('.bg').bind('touchstart', function(e){
			temp.fadeOut();
			e.preventDefault();
		});
	}

	temp.find('.close').click(function(e){
		if(bg){
			$("#"+id).parent().fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
		}else{
			temp.fadeOut();
		}
		return false;
	});

	//temp.parent().find('.bg').click(function(e){ //배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
	//	$("#"+id).parent().fadeOut();
	//});

	if(typeof func=='function'){
		func();
	}
}

//레이어 팝업
function layerPop_open(el){
	var temp = $('#' + el),
	bg = $(".layer-pop-dimmed");

	bg.fadeIn();
	temp.fadeIn();

	if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
	else temp.css('left', '0px');

	temp.find('.close').click(function(e){
		bg.fadeOut();
		temp.fadeOut();
		return false;
	});
}

function layerPop_close(el){
	var temp = $('#' + el),
		bg = $(".layer-pop-dimmed");

	bg.fadeOut();
	temp.fadeOut();
	return false;
}
// s:iframe layer open

Number.prototype.format = function(){
	if(this==0) return 0;
	var reg = /(^[+-]?\d+)(\d{3})/;
	var n = (this + '');
	while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
	return n;
};

var fm_all = null;
var div = null;
var layerdiv = null;
var fm = null;

function coverScreen() {
	var h = parseInt(document.documentElement.scrollHeight) + "px";
	var w = parseInt(document.body.offsetWidth) + "px";

	div = document.getElementById("layer_pop_box");

	document.body.appendChild(div);

	//document.body.onresize = document.body.onresizestart = document.body.onresizeend = document.body.onscroll = function () {
		//layerdiv.style.left = (parseInt(document.documentElement.clientWidth) / 2) - (parseInt(layerdiv.style.width) / 2) + 'px';
	//}

	layerdiv = document.createElement("div");
	layerdiv.style.width = 400;
	layerdiv.style.height = 400;
	layerdiv.style.left = (parseInt(document.documentElement.clientWidth) / 2) - (parseInt(layerdiv.style.width) / 2) + 'px';
	layerdiv.style.top = (parseInt(document.documentElement.clientHeight) / 2) - (parseInt(layerdiv.style.height) / 2) + 'px';
	layerdiv.style.position = "absolute";
	layerdiv.style.zIndex = 9990;
	layerdiv.style.display = "none";
	layerdiv.style.backgroundColor = "transparent";
	layerdiv.style.color = "#FFFFFF";
	document.body.appendChild(layerdiv);
	
	//아이프레임으로 넣기
	/*
	fm = document.createElement("iframe");
	fm.id = "iframe_pop";
	fm.style.width = "100%";
	fm.style.height = "100%";
	fm.allowTransparency = "true";
	fm.style.backgroundColor = "transparent";
	fm.frameBorder = "0";
	fm.style.margin = "0";
	*/
	fm = document.createElement('div');
	fm.id = "pop_wrap";
	layerdiv.appendChild(fm);
}
function showLayer(_w, _h, _src) {
	if (div == null) {
		coverScreen();
		//coverScreen("/public/payment/PC/back");
	}
	layerdiv.style.width = _w + 'px';
	layerdiv.style.height = _h + 'px';
	layerdiv.style.left = (parseInt(document.documentElement.clientWidth) / 2) - (parseInt(layerdiv.style.width) / 2) + 'px';
	layerdiv.style.top = ((parseInt(document.documentElement.clientHeight) / 2) + (parseInt(document.body.scrollTop + document.documentElement.scrollTop))) - (parseInt(_h) / 2) + 'px';
	//fm.src = _src;

	$('#'+fm.id).load(_src);
	div.style.display = "block";
	layerdiv.style.display = "block";
}
function hideLayer() {
	div.style.display = "none";
	layerdiv.style.display = "none";
	$(".pop-con-wrap").remove();
}
// e:iframe layer open

function layerPop_open_m(el){
	var temp = $('#' + el);
	if($("body").hasClass('fix')){
		$(".popup-layer").removeClass('open');
		temp.addClass('open').focus(); //.attr("tabindex", "0")
	}else{
		temp.addClass('open').focus(); //.attr("tabindex", "0")
		if($(".popup-layer").hasClass('open')){
			$("body").addClass('fix');
		}
	}


	temp.find('.close, .cancel').on('click', function(){
		$(".popup-layer").removeClass('open');
		self.focus();
		$("body").removeClass('fix');
	});
}

function layerPop_close_m(el){
	var temp = $('#' + el);

	temp.removeClass('open');
	self.focus();
	$("body").removeClass('fix');
}


//쿠키세팅
function setCookie(name,value,expiredays)
{
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
//쿠키추출
function getCookie( name )
{
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length )
	{
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie )
		{
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 ) break;
	}
	return "";
}