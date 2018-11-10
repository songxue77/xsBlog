/** common **/
//nav
function nav(){
	var viewScrollTop = $(window).scrollTop();
	var winHeight = $(window).height();
	var conHeight = $("body").outerHeight();
	var footerHeight = $("#footer").outerHeight();	
	var offset = 20;
	var footerTop = conHeight-footerHeight-winHeight+offset;
	if( viewScrollTop < footerTop ){
		$(".nav").stop().fadeIn(200);
	}else{
		$(".nav").stop().fadeOut(50);
	}
}

//top fixed
function tabFix(){
	if($("#top-fix").length){
		var fixHeight = $("#top-fix").height();
		$("#top-fix").height(fixHeight);
		var viewScrollTop = $(window).scrollTop();
		var tabTop = $("#top-fix").offset().top;
		var offset = 0;
		if( viewScrollTop < tabTop+offset ){
			$("#top-fix").removeClass('fixed');
		}else{
			$("#top-fix").addClass('fixed');
		}
	}	
}
/** //common **/

function init_ui(){
	//layer-btn del,modify
	var $btn_more = $(".word-list .icon-more");
	$btn_more.on('click', function(e){
		e.preventDefault();
		var active = $(this).next('.layer-btn').is(':visible');
		if(active){
			$(this).next('.layer-btn').fadeOut(300);
		}else{
			$btn_more.next('.layer-btn').fadeOut(300);
			$(this).next('.layer-btn').fadeIn();
		}
	});	
	
	//단어장 radio
	$("input:radio[name='view-type']").on('change', function(){
		var viewIdx = $("input:radio[name='view-type']:checked").closest('label').index();
		if(viewIdx == 0){
			$(".word").find('.eng').show();
			$(".word").find('.kor').show();
			$(".word").find('a').attr('href','');
		}else if(viewIdx == 1){
			$(".word").find('.eng').show();
			$(".word").find('.kor').hide();
			$(".word").find('a').attr('href','#popup-word-mean');
		}else if(viewIdx == 2){
			$(".word").find('.eng').hide();
			$(".word").find('.kor').show();
			$(".word").find('a').attr('href','#popup-word-mean');
		}
	});	
	//단어 의미 확인 팝업창 내용
	$(".word").find('a').on('click', function(e){
		e.preventDefault();
		var viewIdx = $("input:radio[name='view-type']:checked").closest('label').index();
		var $word = $("#popup-word-mean").find('.cont');		
		if(viewIdx != 0){
			if(viewIdx == 1){
				$word.prev('h1').find('span').text('의미');
				var $wordKor = $(this).closest('.word').find('.kor').children().text();
				$word.find('p').text($wordKor);
			}else if((viewIdx == 2)){
				$word.prev('h1').find('span').text('단어');
				var $wordEng = $(this).closest('.word').find('.eng').children().text();
				$word.find('p').text($wordEng);
			}
		}
	});
	
	//qna
	$(".question .list").children('a').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('active').next('.q').stop().slideToggle();
	});
	
	//checkbox 전체선택
	var $listChk = $("[name='chk-atd']").not('#all-atd');
	$("#all-atd").on('change', function(){
		var active = $(this).is(':checked');		
		if(active){
			$("[name='chk-atd']").prop('checked', true);
		}else{
			$("[name='chk-atd']").prop('checked', false);
		}
	});	
	$listChk.on('change', function(){
		if($(this).is(":checked")){
			var isAllChecked = 0;
			$listChk.each(function(){
				if(!this.checked){
					isAllChecked = 1;				
				}				
			});
			if(isAllChecked == 0){
				$("#all-atd").prop('checked', true);
			}
		}else{
			$("#all-atd").prop('checked', false);
		}		
	});
	
	//lesson
	$(".lesson").find('svg').each(function(){
		var ratio = $(this).attr('data-ratio');
		$(this).find('circle').css("stroke-dasharray", ratio + " 100");
	});
}

window.onload = function () {
	$(".word").find('a').attr('href','');
}

$(document).ready(function(){
	init_ui();
});

$(window).scroll(function(){
	nav();
	tabFix();
});


/** common **/
/*function popupLayer(obj){
	var self = $(obj),
		target = $($(obj).attr("href"));

	target.attr("tabindex", "0").addClass('open').focus();
	if($(".popup-layer").hasClass('open')){
		$("body").addClass('fix');
	}

	target.find('.close, .cancel').on('click', function(){
		$(".popup-layer").removeClass('open');
		self.focus();
		$("body").removeClass('fix');
	});
}

$("a[href*='#popup-']").on('click', function(e){
	e.preventDefault();
	var target = $($(this).attr("href"));
	if(target.is(':visible')){
		target.hide();
		$("body").removeClass('fix');
	}else{
		popupLayer(this);
	}
});*/
/** //common **/

/*
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
*/

function layerSmall_open_m(el){
	var temp = $('#' + el);
	temp.toggleClass('open');
	temp.find('.close, .cancel').on('click', function(){
		temp.removeClass('open');
	});
}
function layerSmall_close_m(el){
	var temp = $('#' + el);
	temp.removeClass('open');
}
