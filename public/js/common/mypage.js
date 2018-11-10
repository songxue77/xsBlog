;(function($, undefined){
	// 엄격한 문법 모드 발동 : STRICT MODE
	//"use strict";

	// 헬퍼 참조 변수 설정 : defind helper local variables
	var win = window, doc = document, html = doc.documentElement, init_ui;
	

	// 초기화 실행 함수
	init_ui = function() {
		//my menu 변경
		var offset = 40;
		$( "#my-menu ul" ).sortable({
			cursor: "move",
			opacity: 0.5,
			connectWith: "#my-menu ul",
			create: function(event, ui){
				$("#my-menu .add").sortable( "disable" );
				var size = $("#my-menu .add").find('li').length;
				$("#my-menu .add").css('background-position-x', (131*size)+offset);
			},
			stop: function(event, ui){
				var size = $("#my-menu .add").find('li').length;
				$("#my-menu .add").css('background-position-x', (131*size)+offset);
				if(size > 7){
					$("#my-menu .remove").sortable( "cancel" );
					alert('더 이상 자주 쓰는 메뉴를 추가하실 수 없습니다.');
				}
			}
		}).disableSelection();
		
		//my menu 설정 버튼
		$("#my-menu").find('button').on('click', function(){
			var active = $("#my-menu").find('.remove').is(':visible');		
			if(active){
				$("#my-menu").find('.remove').stop().slideUp(70);
				$("#my-menu").find('a').unbind('click', false).click();
				$("#my-menu .add").sortable( "disable" );
			}else{
				$("#my-menu").find('.remove').stop().slideDown(70);
				$("#my-menu").find('a').bind('click', false);
				$("#my-menu .add").sortable( "enable" );
			}
		});
	};

	// 문서가 준비되면 실행 : DOM Ready
	$(doc).ready(init_ui);

})(window.jQuery);