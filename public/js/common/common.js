/**
 * 폼 체크
 */
var HCForm = function(form_id) {
    var form_id = form_id || null;
    this.frm = $('#'+form_id);
    this.init();
};

HCForm.prototype = {
    valid : true,
    is_msie : true, //$.browser.msie,
    checktype : 'input:not(:disabled), textarea:not(:disabled), select:not(:disabled)',
    reg : {
        id:'^[a-z0-9]{4,20}$',
        password:'^[a-zA-Z0-9]{4,20}$',
        alphanum:'^[a-zA-Z0-9]*$',
        email_id:'^[a-zA-Z0-9\-]*$',
        password:'^[0-9a-zA-Z~!@#$%^&*\\(\\[{|}\\]\\)-_+=\/?<,.;:>]{4,20}$',
        number:'^[0-9]*$',
        domain:'^([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$',
        decimal:'^[0-9/.]*$',
        phone:'^([0-9]{2,3})-?([0-9]{3,4})-?([0-9]{4})$',
        cell:'^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$',
        email:'^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$'
    },
    reg_msg : {
        id:'아이디는 4~20자리의 숫자와 영소문자 조합으로 입력하세요.',
        password:'비밀번호는 4~20자리의 숫자와 영문자, 특수문자의 조합으로 입력하세요.',
        alphanum:'영문자와 숫자만 입력하세요.',
        email_id:'이메일 아이디형식이 올바르지 않습니다.',
        number:'숫자만 입력하세요.',
        domain:'도메인 형식이 올바르지 않습니다.',
        decimal:'숫자와 소수점만 입력하세요.',
        phone:'전화번호 형식에 맞게 입력하세요..',
        cell:'휴대폰번호 형식에 맞게 입력하세요.',
        email:'이메일 형식에 맞게 입력하세요.'
    },
    init : function() {
        var el_arr = this.frm.find(this.checktype).filter('[required]');
        if(this.is_msie) return false;
    },
    validator : function(el_name) {
        var me = this;
        me.valid = true;
        if(typeof el_name != 'undefined') {
            var frm_el = me.frm.find('[name="'+el_name+'"]');
        }
        else {
            var frm_el = me.frm.find(this.checktype).filter('[required], [data-field-sync], [data-field-regex] ');
        }

        $.each(frm_el, function(event, e) {
            var el = $(e), val = '';
            if (el.prop('tagName').match(/input/i) && (el.prop('type')=='checkbox' || el.prop('type')=='radio')) {
                val = $(':checked[name="'+el.prop('name')+'"]').map(function() { return this.value; }).get().join(',');
            }
            else {
                val = el.val();
            }

            val = $.trim(val);

            if (!val && el.attr('required')) {
                me.valid = false;
                if (el.attr('data-required-msg') != undefined) {
                    alert(el.attr('data-required-msg'));
                }else {
                    alert("잘못된 값입니다.");
                }
                el.focus();
                el.select();
                return false;
            }

            if (val) {
                var data_min = el.data('number-min'); //최소값체크
                var data_equal = el.data('number-equal'); //같은값 체크
                var data_max = el.data('number-max'); //최대값 체크
                var data_sync = el.data('field-sync');
                var data_regex = el.data('field-regex');
                var len_min = el.data('length-min'); //최소 길이
                var len_max = el.data('length-max'); //최대 길이

                //선택 최소갯수
                if (data_min) {
                    if (val < data_min) {
                        me.valid = false;
                        alert(el.attr('data-field-min-msg'));
                        el.focus();
                        return false;
                    }
                }

                //선택 최대갯수
                if (data_max) {
                    if (val < data_min) {
                        me.valid = false;
                        alert(el.attr('data-field-max-msg'));
                        el.focus();
                        return false;
                    }
                }

                //정규식체크
                if (data_regex) {
                    var regex = new RegExp($(me.reg).prop(data_regex));
                    var regex_msg = el.attr('data-field-regex-msg');
                    if(!regex_msg) regex_msg = $(me.reg_msg).prop(data_regex);
                    if (!regex.test(val)) {
                        me.valid = false;
                        alert(regex_msg);
                        el.focus();
                        return false;
                    }
                }

                //동일값 체크
                if (data_sync) {
                    if (val != $('#'+data_sync).val()) {
                        me.valid = false;
                        alert(el.data('field-sync-msg'));
                        el.focus();
                        return false;
                    }
                }

                //최소길이
                if (len_min) {
                    if (val.length < len_min) {
                        me.valid = false;
                        alert(el.attr('data-len-min-msg'));
                        el.focus();
                        return false;
                    }
                }

                //최대길이
                if (len_max) {
                    if (val.length > len_max) {
                        me.valid = false;
                        alert(el.attr('data-len-max-msg'));
                        el.focus();
                        return false;
                    }
                }
            }
        });
        return me.valid;
    },
    linkCheckboxGroup : function(gname, min, max) {
        var checkbox = frm.find('input:checkbox[name="'+gname+'"]');
        checkbox.change(function(){
            var checked = checkbox.filter(':checked').length;
            $('input[data-link="'+gname+'"]').val(checked);
        });
    },
    validator_checkbox : function() {
        var frm_checkbox = frm.find('input:checkbox').filter(['']);
        var count_checked = 0;
        $.each(frm_checkbox, function(e, o) {
            if (!$(o).val()) {
                valid = false;
                return false;
            }
        });
    },
    serialize : function(disabled) {
        if (disabled) {
            var disabled = this.frm.find(':input:disabled').removeAttr('disabled');
            var serialized = this.frm.serialize();
            disabled.attr('disabled','disabled');
        }
        else {
            var serialized = this.frm.serialize();
        }
        return serialized;
    },
    serializeArray : function(){
        var serializedArray = this.frm.serializeArray();
        return serializedArray;
    },
    invalid : function(el_id, msg) {
        var o = $('#'+el_id);
        var e = o.html();
        o.addClass('invalid');
    },
    valid : function(el_id) {
        var o = $('#'+el_id);
        var e = o.html();
        o.removeClass('invalid');
    },
    value : function(el_name, value) {
        if (typeof value != 'undefined') {
            this.setValue(el_name, value);
        }
        else {
            return this.getValue(el_name);
        }
    },
    focus: function(el_name) {
        var el = this.frm.find("[name='"+el_name+"']");
        el.focus();
    },
    setValue : function(el_name, value) {
        var el = this.frm.find("[name='"+el_name+"']");
        if(!el.length) return false;
        var tag = el.prop('tagName').toLowerCase();
        var type = el.prop('type').toLowerCase();
        if (tag == 'input') {
            switch (type) {
                case 'text':
                case 'hidden':
                    el.val(value);
                    break;
                case 'radio':
                    el.filter('[value="'+value+'"]').prop("checked", true);
                    break;
                case 'checkbox':
                    el.filter('[value]').prop("checked", false);
                    el.filter('[value="'+value+'"]').prop("checked", true);
                    break;
            }
        }
        else if (tag == 'select') {
            el.find('option[value="'+value+'"]').attr("selected", true);
        }
    },

    getValue : function(el_name) {
        var el = this.frm.find("[name='"+el_name+"']");

        if (!el.length) return false;

        var me = this;
        var tag = el.prop('tagName').toLowerCase();
        var type = el.prop('type').toLowerCase();

        if(el.length>1 && type!='radio') {
            var el_value = new Array();
            var v;
            $.each(el, function(i,v){
                val = me.getValueByTag($(v));
                el_value.push(val);
            });

            return el_value;
        }
        else {
            return me.getValueByTag(el);
        }
    },
    getValueByTag : function(el) {
        var tag = el.prop('tagName').toLowerCase();
        var type = el.prop('type').toLowerCase();
        var el_name = el.attr('name');
        var value;
        if (tag == 'input')
        {
            switch(type) {
                case 'radio':
                    value = $(':radio[name="'+el_name+'"]:checked').val();
                    break;
                case 'text':
                case 'hidden':
                default :
                    value = el.val();
            }
        }
        else {
            value = el.val();
        }

        return value;
    },
    disable: function(el_name, bool) {
        var el, me = this;
        if (typeof el_name == 'object') {
            $.each(el_name, function(i,e) {
                el = me.frm.find("[name='"+e+"']");
                el.attr('disabled',bool);
            })
        }
        else {
            el = this.frm.find("[name='"+el_name+"']");
            el.attr('disabled',bool);
        }
    },
    reset : function() {
        this.frm[0].reset();
    },
    submit : function() {
        this.frm[0].submit();
    }
};


var getZindex = function() {
    var elements = document.getElementsByTagName("*");
    var highest_zindex = 0;

    for (var i = 0; i < elements.length - 1; i++) {
        if (parseInt(elements[i].style.zIndex) > highest_zindex) {
            highest_zindex = parseInt(elements[i].style.zIndex);
        }
    }
    return highest_zindex;
}

var HCModal = function(modal_id, settings) {
    this.modal_id = 'HCModal_'+modal_id;
    this.tpl = '<div id="'+this.modal_id+'" class="hcmodal" style="display: none;">' +
        '<div class="hcmodal-content">' +
        '<div class="hcmodal-header"><button type="button" class="hcmodal-close close">×</button></div>' +
        '<div class="hcmodal-body"></div>' +
        '</div></div><div id="'+this.modal_id+'_backdrop" class="hcmodal-backdrop"></div>';
    var zIndex = getZindex();
    this.settings = settings || {zIndex:(zIndex+10), location:document};
    this.init();
};

HCModal.prototype = {
    url: null,
    param: null,
    modal:'',
    settings:{},
    init:function() {
        if(!$('#'+this.modal_id, top.document).length) {
            $("body", this.settings.location).append(this.tpl);
        }
        this.modal = $('#'+this.modal_id, top.document);
        this.modal.find('button.hcmodal-close').click(this.close.bind(this));
        this.backdrop = $('#'+this.modal_id+'_backdrop', this.settings.location);
    },
    open:function(url, param, callback) {
        this.url = url;
        this.param = param;

        if(this.settings.zIndex) {
            this.backdrop.css('z-index', this.settings.zIndex);
            $('#'+this.modal_id).css('z-index', this.settings.zIndex+1);
            $('#'+this.modal_id).css('z-index');
        }

        this.setSize(this.settings.width, this.settings.height, this.settings.maxWidth, this.settings.maxHeight);

        if (this.settings.bodyOverflow) {
            $('body').css('overflow', this.settings.bodyOverflow);
            $('body').css('padding-right', HCCommon.getScrollbarWidth() + 'px');
        }
        //
        this.backdrop.fadeIn('fast');

        this._load(url, param, callback);
    },
    close: function() {
        var me = this;

        if (this.settings.bodyOverflow) {
            $('body').css('overflow', '');
            $('body').css('padding-right', '');

            var currentMarginLeft = parseInt(this.modal.css('margin-left').replace('px', ''));

            this.modal.css('margin-left', currentMarginLeft + HCCommon.getScrollbarWidth() / 2 + 'px');
        }

        this.modal.fadeOut('fast', function() {
            $(this).remove();
        });
        this.backdrop.fadeOut('fast', function() {
            $(this).remove();

            if($.isFunction(me.settings.close)) {
                me.settings.close();
            }
        });
    },
    html:function(html) {
        var spot = this.modal.find('.hcmodal-body');
        spot.html(html);
    },
    show:function() {
        this._center();
        this.backdrop.fadeIn('fast');
    },
    hide: function() {
        this.modal.addClass('hide');
        this.backdrop.addClass('hide');
    },
    remove: function() {

    },
    setSize: function(width, height, maxWidth, maxHeight) {
        var body = this.modal.find('.hcmodal-body');

        if (width) body.css('width', width + 'px');
        if (height) body.css('height', height + 'px');
        if (maxWidth) body.css('max-width', maxWidth + 'px');
        if (maxHeight) body.css('max-height', maxHeight + 'px');
    },
    ajaxRequest: function (option) {

        var _this = this;
	    var request = new HCRequest();

        var loadingLayer = $('.loading-layer-dimmed, .loading-layer');
        if (loadingLayer.length > 0) loadingLayer.addClass('on');

        return request.ajax(option).fail(function (response) {
            console.warn('request fail', response);
        }).always(function () {
            if (loadingLayer.length > 0) loadingLayer.removeClass('on');
        });

    },
    _load:function(url, param, callback) {
        var self = this;
        var spot = this.modal.find('.hcmodal-body');
        var loadingLayer = $('.loading-layer');
        if (loadingLayer.length > 0) loadingLayer.addClass('on');

        $.ajax({
            url:url,
            data:param,
            dataType:'html',
            type:'get'
        }).done(function(r) {
            spot.html(r);
            self.modal.fadeIn();
            self._center();
            self.modal.find('.modal-close').click(self.close.bind(self)); //모달창 안에 있는 닫기 버튼
            self.backdrop.click(self.close.bind(self));

            if($.isFunction(callback)) callback();

            // 내부 이미지 load 이후 포지션 재세팅
            var innerImg = spot.find('img');
            if (innerImg.length > 0) {
                innerImg.on('load', function () {
                    self._center();
                });
            }

        }).always(function () {
            if (loadingLayer.length > 0) loadingLayer.removeClass('on');
        }).fail(function (response) {
            self.close();
        });
    },
    _center:function(){
        var self = this;
        this._position();
        $(window).resize(function() { self._position() });
    },
    _position: function() {
        var e = this.modal;
        var half = {width: e.outerWidth() / 2, height: e.outerHeight() / 2}
        //
        if(this.settings.top) e.css({top: this.settings.top+'px', left: '50%', marginTop:0, marginLeft: -(half.width)+'px'});
        else e.css({top: '50%', left: '50%', marginTop: -(half.height)+'px', marginLeft: -(half.width)+'px'});
        //
        var pos = e.position();
        if(pos.left<half.width) e.css({left:0, marginLeft:0});
        if(!this.settings.top && pos.top<half.height) e.css({top:0, marginTop:0});
    },

    reload: function () {
        this._load(this.url, this.param);
    }
}

var formExtend = function (obj) {
    if (typeof $ != 'function' || !$(obj).is('form')) {
	    console.warn('formExtend init Fail');
	    return;
    };

	var form = $(obj);
    var func = {
        form: form,
        formRaw: form.get(0),
        RegExp: {
            'notNull': /\S{1}/g,
            'id': '^[a-z0-9]{4,20}$',
            'alphanum': '^[a-zA-Z0-9]*$',
            'email_id': '^[a-zA-Z0-9\-]*$',
            'password': '^[0-9a-zA-Z~!@#$%^&*\\(\\[{|}\\]\\)-_+=\/?<,.;:>]{4,20}$',
            'number': '^[0-9]*$',
            'domain': '^([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$',
            'decimal': '^[0-9/.]*$',
            'phone': '^([0-9]{2,3})-?([0-9]{3,4})-?([0-9]{4})$',
            'phone_raw': '^([0-9]{0,15})$',
            'cell': '^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$',
            'email': '^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$'
        },
        validateRule: [],
        action: function (path) {
            if (path) {
                this.formRaw.action = path;
            }
            return this.formRaw.action;
        },
        submit: function () {
            this.formRaw.submit();
        },
        set: function (target, value) {
            this.update(target, value);
        },
	    get: function (target) {
		    return this.formRaw[target].value;
	    },
        update: function (target, value) {
            var obj = $(this.formRaw[target]);
            if (obj.length == 0) {
                console.warn(target + ' :: can not find');
            }
            obj.val(value);
        },
        updateArr: function (arr) {
            if (!$.isArray(arr)) {
                return console.warn('param is not array');
            }
            for (var i in arr) {
                this.update(arr[i][0], arr[i][1]);
            }
        },
        updateSubmit: function (target, value) {
            this.update(target, value);
            this.submit();
        },
        updateArrSubmit: function (arr) {
            this.updateArr(arr);
            this.submit();
        },
        initParam: function () {
            this.form.find('input, select').each(function () {
                var obj = $(this);
                obj.val('');
                if ($(this).is('select')) {
                    var option = obj.find('option');
                    if (option.length > 0) {
                        obj.val(option.eq(0).attr('value'));
                    }
                }
            });
        },
        serializeKey: function () {
            var data = this.form.serializeArray();
            var dataArr = {};
            for (var i in data) {
                dataArr[data[i]['name']] = data[i]['value'];
            }
            return dataArr;
        },
        initParamSubmit: function (arr) {
            this.initParam();
            this.updateArr(arr);
            this.submit();
        },
        setValidateRule: function (rule) {
            this.validateRule = rule;
        },
	    /**
         * validate prop = {name:{'msg','rule','obj','callback'}}
	     * @returns {{result: boolean, msg: Array}}
	     */
	    validate: function () {
            var validate = true;
            var msg = [];

            for(var i in this.validateRule) {
                var ruleProp = this.validateRule[i];
                var regRule = ruleProp['rule'] || 'notNull';

                var regExp = this.RegExp[regRule];
                if (!regExp) {
	                validate = false;
                    console.warn('cannot find ' + i + 'regExp');
                    continue;
                }

                var obj = $(ruleProp.obj ? ruleProp.obj : this.formRaw[i]);
                if (obj.length == 0) {
	                validate = false;
                    console.warn('input obj ' + i + 'cannot find');
                    continue;
                }
                if (obj.is(':radio')) {
                    var radioObj = null;
                    obj.each(function (idx) {
                        if (this.checked) {
                            radioObj = $(this);
                        }
                    });
                    if (radioObj == null || radioObj.length == 0) {
                        validate = false;
                        msg.push(ruleProp.msg || i + ' validate fail');
                        if (ruleProp.callback) {
                            ruleProp.callback(obj, this);
                        }
                        continue;
                    }
                }

                if (!new RegExp(regExp).test(obj.val())) {
                    validate = false;
                    msg.push(ruleProp.msg || i + ' validate fail');
	                if (ruleProp.callback) {
		                ruleProp.callback(obj, this);
	                }
                }
            }
            return {
                result: validate,
                msg: msg
            };
        }
    }
    return func;
}

var HCRequest = function (opt) {
    if (typeof $ != 'function') {
        console.warn('HCRequest init Fail');
        return;
    };

    var func = {
        state: null,
        defaultOption: {
            url: '/',
            method: 'POST',
            dataType: 'JSON',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {}
        },
        ajax: function (option) {
            var _this = this;
            option = this.setOption(option);

            _this.state = 'busy';
            return $.ajax(option).fail(function () {
                console.warn('HCRequest fail', this.url);
            }).always(function () {
                _this.state = 'ready';
            });
        },
        setOption: function (option, replace) {
            this.defaultOption = $.extend(this.defaultOption, option, true);
            if (replace) {
                this.defaultOption = option;
            }
            return this.getOption();
        },
        getOption: function () {
            return this.defaultOption;
        }
    }
    return func;
}


var HCCommon = {
    getScrollbarWidth: function () {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    }
};

navigator.getAgent = function () {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = (M[2]) ? [M[1], M[2]] : [navigator.appName, navigator.appVersion];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);

    return {
        'browser': M[0],
        'version': (M[1]) ? M[1] : ''
    };
};


// POLYFILL :: for Comparability Old IE
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs  = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP    = function() {},
            fBound  = function() {
                return fToBind.apply(this instanceof fNOP
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();

        return fBound;
    };
}

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
    Object.keys = (function() {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function(obj) {
            if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}