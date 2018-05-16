// 처음 시작되지 말아야할 개체들을 정의
// 만약, Slide 오작동될 가능성이 있을 경우 사용.
var exceptElements = [
	'.top_open_box',
	'.ly_movie_bx'
];
var __globalBxslider = {
	bxList:[],
	setup:function(idx, attr){
		if(attr.bxSlider){
			// 이미 해당 배너에 bxslider 적용됨

		}else{
			// attr에 bxslider 적용
			var $sliderLi = $(".bxslider li", attr);

			var wd = $sliderLi.width();

			var isSingleImage = $sliderLi.length === 1;

			var _mode = $(attr).attr("data-mode"); // 슬라이드 효과 - horizontal,vertical,fade
			_mode = _mode ? _mode : 'horizontal';

			var _maxSlides = $(attr).attr("data-maxSlides"); // 최대 보여지는 갯수
			_maxSlides = _maxSlides && !isNaN(parseInt(_maxSlides)) ? parseInt(_maxSlides) : 1;

			var _slideMargin = $(attr).attr("data-slideMargin"); // 슬라이드 사이 margin 값
			_slideMargin = _slideMargin && !isNaN(parseInt(_slideMargin)) ? parseInt(_maxSlides) : 0;

			var _delay = $(attr).attr("data-delay"); // 슬라이드 딜레이 설정
			_delay = _delay && !isNaN(parseInt(_delay)) ? parseInt(_delay) : 4000;

			var _speed = $(attr).attr("data-speed"); // 슬라이드 속도 설정
			_speed = _speed && !isNaN(parseInt(_speed)) ? parseInt(_speed) : 400;

			var _autoBtn = $(attr).attr("data-autoBtn"); // play / stop / puase
			_autoBtn = _autoBtn && _autoBtn=='true' ? true : false;

			var _auto  = $(attr).attr("data-auto"); // 자동슬라이드 여부
			_auto = _auto && _auto=='true' ? true : false;

			var _pager = $(attr).attr("data-pager");  // 페이지 동그란 버튼 설정 여부
			_pager = ( _pager && _pager=='true' && !isSingleImage ) ? true : false;

			var _controls = $(attr).attr("data-controls"); //자동 슬라이드 컨트롤 버튼 설정 여부
			_controls = _controls && _controls=='true' ? true : false;

			var _touch = $(attr).attr("data-touch"); //마우스 터치 슬라이드 사용여부
			_touch = _touch && _touch=='true' ? true : false;

			var bgCacheCheck = false,
				bgAvailable = false,
				bgColors = [],
				bgTarget;

			__globalBxslider.bxList[__globalBxslider.bxList.length] = attr.bxSlider = $('.bxslider',attr).bxSlider({
				slideWidth: wd
				,slideMargin: _slideMargin
				,minSlides: 1
				,maxSlides: _maxSlides // 최대 보여지는 갯수
				,speed: _speed
				,pause: _delay
				,mode: _mode // 슬라이드 효과 - horizontal,vertical,fade
				,autoControls: _autoBtn // play / stop / puase
				,auto: _auto // 자동슬라이드 여부
				,pager: _pager
				,controls: _controls
				,touchEnabled: _touch
				,onSliderLoad:function(){

					/**
					 *  LazyLoad 옵션이 켜져있을 경우 슬라이드 내부의 이미지는 data-src로 실제 로드하지 않으며
					 *  슬라이드 로드와 슬라이드 이동 직전에 자신과 다음의 이미지를 로드한다
					 */
					__globalBxslider.renderLazyImage(this);

					// 슬라이드 로드 후 자동정지 자동시작 이벤트 부여
					/* controls , pager click 했을떄 auto 멈추는 현상 개선 */
					if(!_autoBtn){
						if( _auto && !isSingleImage ){
							$(attr).on('mouseover',function(){

								this.bxSlider.stopAuto()
							});
							$(attr).on('mouseout',function(){
								this.bxSlider.startAuto()
							});
						}
					}

				} // 로드 완료?
				,onSliderResize:function(){} // ...
				,onSlideBefore:function(el, oi, i){
					__globalBxslider.renderLazyImage(this);

					if( !bgCacheCheck ) {
						bgCacheCheck = true;

						var $bxsliderDefault = $(el).closest('.bxslider-default');
						if( !$bxsliderDefault.hasClass('bxslider-bgcolor') ) {
							bgAvailable = false;
							return;
						}
						$sliderLi.each(function() {
							var color = $(this).css('backgroundColor');
							bgColors.push(color);
							if( !bgAvailable && color != 'rgba(0, 0, 0, 0)' && color != 'rgb(0, 0, 0)' ) {
								bgAvailable = true;
							}
						});
						bgTarget = $(el).closest('.bxslider-default').parent().parent();
					}
					if( bgAvailable && bgTarget ) {
						this.speed = 0;
						bgTarget.css({
							'backgroundColor': bgColors[i]
						});
					}
				}

				//infiniteLoop: false
			});
		}
	},
	startAuto:function() {
		this.bxSlider.startAuto();
	},
	stopAuto:function() {
		this.bxSlider.stopAuto();
	},
	resize:function(){
		// 배너 resize
		// __globalBxslider.resize();
		for(var i in this.bxList){
			if( $.isNumeric(i) === false )
				continue;
			try {
				this.bxList[i].redrawSlider();
			}
			catch(e) {
				console.warn('Should Remove Legacy Code in bxslider.js');
				continue;
			}
		}
		// 2016-12-27 영준수정
	},
	init:function(selector){
		$(selector).each(this.setup);
		$(selector).css("overflow","visible");
	},
	reloadSlider: function($el) {
		var _this = this;
		$el.each(function(i, $this) {
			var idx = parseInt($('.bxslider-default').index($this));
			_this.bxList[idx].reloadSlider();
		});
	}, //탭클릭시 슬라이드 안되는 부분 수정 2016-12-02 영준주임
	renderLazyImage: function (slideObj, preRenderRange) {
		if (!preRenderRange) {
			preRenderRange = 0; // 미리 로드할 슬라이드 갯수
		}
		var slideCount = slideObj.getSlideCount();
		var currentSlideIdx = slideObj.getCurrentSlide();
		var currentElem = slideObj.getSlideElement(currentSlideIdx);
		currentElem.find('.slider-lazy-image').each(function () {
			var imgUrl = $(this).attr('data-src');
			if (imgUrl) {
				$(this).attr('src', imgUrl).removeClass('slider-lazy-image');
			}
		});
		for (var i = 0; i < preRenderRange; i++) {
			var nextSlideIdx = currentSlideIdx + i;
			if (nextSlideIdx + 1 > slideCount) {
				nextSlideIdx = 0 + i;
			}
			var nextElem = slideObj.getSlideElement(nextSlideIdx);
			nextElem.find('.slider-lazy-image').each(function () {
				var imgUrl = $(this).attr('data-src');
				if (imgUrl) {
					$(this).attr('src', imgUrl).removeClass('slider-lazy-image');
				}
			});
		}
	}
};

$(function() {
	var defaultElement = $('.bxslider-default');

	/* ie8,ie7 에서 작동하지 않을때 */
	if (!('forEach' in Array.prototype)) {
		Array.prototype.forEach= function(action, that /*opt*/) {
			for (var i= 0, n= this.length; i<n; i++)
				if (i in this)
					action.call(that, this[i], i, this);
		};

	}
	if( exceptElements.length > 0 ) {
		exceptElements.forEach(function(objStr) {
			var bxDefault = $(objStr).find('.bxslider-default');
			if( bxDefault.length > 0 ) {
				defaultElement = defaultElement.not(bxDefault);
			}
		});
	}

	// document load가 아닌 window 로드 이후 슬라이드 작동
	$(window).on('load', function () {
		__globalBxslider.init(defaultElement);
	});


	$(window).trigger('old-tab')
});