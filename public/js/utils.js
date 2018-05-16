/**
 * Created by CodeHolic on 2018-03-09.
 */

var Utils = function() {};

window.utils = new Utils();



/**
 * Utils 설정 정보
 */
Utils.prototype.options = {
    "domain": "hackers.com",
    "confName": "config"
};



/**
 * @param conf : {key: value}
 * 쿠키 설정 추가
 */
Utils.prototype.setConfig = function(conf) {
    var config = utils.getCookie(utils.options.confName);
    if (config) {
        config = JSON.parse(config);
    } else {
        config = {};
    }
    if (typeof conf === 'object') {
        for(var key in conf) {
            config[key] = conf[key];
            utils.setCookie("config", JSON.stringify(config), 730);
        }
    }
};

Utils.prototype.removeConfig = function(key) {
    var config = utils.getCookie(utils.options.confName);
    if (config) {
        config = JSON.parse(config);
    } else {
        config = {};
    }
    if (key) {
        if (config[key]) {
            delete config[key];
            utils.setCookie("config", JSON.stringify(config), 730);
        }
    } else {
        utils.setCookie("config", JSON.stringify({}), -1);
    }
}

/**
 * @return object
 * 쿠키 설정 정보 가져오기
 */
Utils.prototype.getConfig = function() {
    var config = utils.getCookie(utils.options.confName);
    if (config) {
        config = JSON.parse(config);
    } else {
        config = {};
    }
    return config;
};

/**
 *
 * @param name
 * @param value
 * @param expiredays
 * 쿠키 저장
 */
Utils.prototype.setCookie = function(name, value, expiredays) {
    var today = new Date();
    today.setTime(today.getTime() + 1000 * 60 * 60 * parseInt(expiredays) );
    document.cookie = name + '=' + escape(value) + '; path=/; expires=' + today.toGMTString() + '; domain=.'+ utils.options.domain
};

/**
 * @param name
 * 쿠키 정보 가져오기
 */
Utils.prototype.getCookie = function(name) {
    name = name + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(name);
    var value = '';
    if(start != -1){
        start += name.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1) {
            end = cookieData.length;
        }
        value = cookieData.substring(start, end);
    }
    return unescape(value);
};

/**
 * @param fs: ****
 * @param s: 11
 * 마스킹 : **11
 */
Utils.prototype.mask = function(fs, s) {
    var string = fs.toString() + s.toString();
    var size = ( fs.length > s.toString().length ) ? fs.length : s.toString().length;
    return string.substr(s.toString().length, size);
};

/**
 * @param str
 * @param org
 * @param dest
 * @returns {string}
 */
Utils.prototype.replaceAll = function(str, org, dest) {
    return String(str).split(org).join(dest);
}

/**
 * @param string
 * @param params {}
 * 문자열에서 패턴({key}, {key?})을 찾아 value 로 대체
 */
Utils.prototype.setPathParam = function(string, params) {
    var matches = [];
    var match;
    var regexp = new RegExp("\{.*?\}", "g");
    while ((match = regexp.exec(string)) != null) {
        matches.push(match[0]);
    }
    for(var i in matches) {
        var key = "";
        if (typeof matches[i] == "string") {
            key = matches[i].replace("{", "").replace("}", "");
            if (string.match("{"+ key +"}")) {
                if (params[key] != undefined && String(params[key]) != "") {
                    string = string.replace(matches[i], params[key]);
                    delete params[key];
                    delete matches[i];
                }
            }
            if (matches[i]) {
                key = matches[i].replace("{", "").replace("?}", "");
                if (string.match("{"+ key +"\\?}")) {
                    if (params[key] != undefined && String(params[key]) != "") {
                        string = string.replace(matches[i], params[key]);
                        delete params[key];
                        delete matches[i];
                    } else {
                        string = string.replace("/"+ matches[i], "");
                        delete matches[i];
                    }
                }
            }
        }

    }
    matches = matches.filter(function(data) {
        return data != !undefined;
    });
    if (matches.length > 0) {
        utils.abort("Required parameter missing ["+ matches.join(",") +"]");
    }
    return string;
};

/**
 * @param message
 * @param callback
 * alert (레이어 팝업으로 변경 대비)
 */
Utils.prototype.alert = function(message, callback) {
    alert(message);
    if (callback) {
        callback();
    }
};

/**
 * @param message
 * @param callback
 * confirm (레이어 팝업으로 변경 대비)
 */
Utils.prototype.confirm = function(message, callback) {
    if(confirm(message)) {
        if (callback) {
            callback();
        } else {
            return true;
        }
    }
    return false;
};

/**
 * @param parameters {key: value}
 * @returns {{items: Array, string: string}}
 * 파라메터 정보
 */
Utils.prototype.query = function(parameters)
{
    var _query = location.search.substring(1);
    var _params = _query.split("&");

    var params = {};
    var result = {};

    for(var i in _params) {
        if (typeof _params[i] == "string") {
            var param = _params[i].split("=");
            params[param[0]] = param[1];
        }
    }

    if (typeof parameters == "object") {
        for(var key in parameters) {
            params[key] = parameters[key];
        }
    }

    var arr = [];
    for(var key in params) {
        arr.push(key +"="+ params[key]);
    }

    result.items = params;
    result.string = arr.join("&");

    return result;
};

/**
 * @param options
 *      options.open: boolean
 *      options.duration: integer
 *      options.opened: callback function
 *      options.closed: callback function
 * @returns {*|jQuery|HTMLElement}
 */
Utils.prototype.dimmed = function(options) {

    options = (options) ? options : {};
    options.duration = (options.duration == undefined) ? 300 : options.duration;

    var $dimmed = $("#dimmed");

    if (options.open === true) {
        $("html").css({"overflow": "hidden"});
        $("#wrap").css({"margin-right": "17px"});
        $dimmed.fadeIn(options.duration, function() {
            if (options.opened) {
                options.opened($dimmed);
            }
        });
    } else {
        $("html").css({"overflow": "scroll"});
        $("#wrap").css({"margin-right": "0px"});
        $dimmed.fadeOut(options.duration, function() {
            if (options.closed) {
                options.closed($dimmed);
            }
        });
    }
    return $dimmed;
};

/**
 * 로딩
 * @param status (true : open, false : close)
 * @param use_dimmed (true : dimmed close)
 */
Utils.prototype.loading = function(status, use_dimmed) {
    use_dimmed = (use_dimmed == undefined) ? true : use_dimmed;
    var count = $(".loading-layer").data("count");
    if (status == true) {
        if (use_dimmed == true) {
            $(".loading-layer-dimmed").removeClass("on").addClass("on");
        }
        count += 1;
        $(".loading-layer").data("count", count);
        $(".loading-layer").removeClass("on").addClass("on");
    } else {
        count -= 1;
        count = count < 0 ? 0 : count;
        $(".loading-layer").data("count", count);
        if ($(".loading-layer").data("count") == 0) {
            if (use_dimmed == true) {
                $(".loading-layer-dimmed").removeClass("on");
            }
            $(".loading-layer").removeClass("on");
        }
    }
};

/**
 * 로딩 종료
 */
Utils.prototype.closeLoading = function() {
    $(".loading-layer-dimmed").removeClass("on");
    $(".loading-layer").removeClass("on");
    $(".loading-layer").data("count", 0);
}

/**
 * @param message
 * 프로세스 중단
 */
Utils.prototype.abort = function(message) {
    utils.closeLoading();
    throw new Error(message);
};

/**
 * 브라우저
 */
Utils.prototype.browser = function() {
    var agent = navigator.userAgent.toLowerCase();
    "mozilla/5.0 (windows nt 6.1; wow64; trident/7.0; slcc2; .net clr 2.0.50727; .net clr 3.5.30729; .net clr 3.0.30729; media center pc 6.0; .net4.0c; .net4.0e; rv:11.0) like gecko"
    if (agent.indexOf("chrome") != -1) {
        return "Chrome";
    }
    if (agent.indexOf("opera") != -1) {
        return "Opera";
    }
    if (agent.indexOf("firefox") != -1) {
        return "Firefox";
    }
    if (agent.indexOf("safari") != -1) {
        return "Safari";
    }
    if (utils.ie() != undefined) {
        return "IE";
    }
};

/**
 * IE 버전
 */
Utils.prototype.ie = function() {
    var agent = navigator.userAgent.toLowerCase();
    var isIE = /*@cc_on!@*/false || !!document.documentMode; // Internet Explorer 6-11
    var isEdge = !isIE && !!window.StyleMedia; // Edge 20+
    if(isIE || isEdge) {
        if (agent.indexOf("msie 10") != -1) {
            return "10";
        }
        if (agent.indexOf("msie 9") != -1) {
            return "9";
        }
        if (agent.indexOf("msie 8") != -1) {
            return "8";
        }
        if (agent.indexOf("msie") != -1) {
            return "UNDER";
        } else {
            return "OVER";
        }
    } else {
        return undefined;
    }
};

/**
 * HTML 테그 제거
 * @param html
 * @returns {*}
 */
Utils.prototype.stripTags = function(html) {
    if ($(html).text() == null || $(html).text() == undefined || $(html).text() == "") {
        return "";
    } else {
        return $(html).text();
    }
};

Utils.prototype.rate = function(t, n) {
    if (t != "" || t == 0) {
        return 0;
    }
    return Math.round(n / t * 100);
}

/**
 * 날짜 포멧
 * @param format
 * @param dateString
 * @returns {void|XML|string|*}
 */
Utils.prototype.dateFormat = function(format, date) {
    var d;
    if (date == undefined || date == "" || date == null) {
        d = new Date();
    } else {
        if (typeof date == "string") {
            d = utils.stringToDate(date);
        } else {
            d = date;
        }
    }
    return format.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(); break;
            case "yy": return utils.mask("00", d.getFullYear() % 1000); break;
            case "MM": return utils.mask("00", d.getMonth() + 1); break;
            case "dd": return utils.mask("00", d.getDate()); break;
            case "E": return weekName[d.getDay()]; break;
            case "HH": return utils.mask("00", d.getHours()); break;
            case "hh": return utils.mask("00", ((h = d.getHours() % 12) ? h : 12)); break;
            case "mm": return utils.mask("00", d.getMinutes()); break;
            case "ss": return utils.mask("00", d.getSeconds()); break;
            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; break;
            default: return $1;
        }
    });
};

/**
 * @param dateString
 * @returns {Date}
 */
Utils.prototype.stringToDate = function(dateString) {
    dateString = dateString.replace(/-/g, '/');
    dateString = dateString.replace('T', ' ');
    return new Date(dateString.replace(/(\+[0-9]{2})(\:)([0-9]{2}$)/, ' UTC\$1\$3'));
}

/**
 *
 * @param date
 * @param days
 * @returns {*}
 */
Utils.prototype.addDays = function(date, days) {
    date.setDate(date.getDate() + days);
    return date;
};

Utils.prototype.dateDiff = function(dateString1, dateString2) {
    var date1 = new Date(dateString1);
    var date2 = new Date(dateString2);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}

/**
 * 폼 ajax 전송
 * @param frmObj
 * @param url
 * @param callback
 * @param error_callback
 * @param async
 * @param error_view
 * @returns {boolean}
 */
Utils.prototype.ajaxFormSubmit = function(frmObj, url, callback, error_callback, async, error_view) {

    if(typeof error_view == 'undefined') error_view = 'alert';

    frmObj.ajaxSubmit({
        url : url,
        type: 'POST',
        dataType : 'json',
        async : (async !== undefined) ? async : false,
        beforeSubmit: function (formData, form, options) {
            // validation
            /*var validator = new FormValidator();
            validator.settings.classes.item = 'item';
            var validatorResult = {valid : false};
            if(error_view == 'alert') {
                validatorResult = validator.checkFirst(frmObj.get(0));
            } else if(error_view == 'layer') {
                validatorResult = validator.checkAll(frmObj.get(0));
            }

            if (!validatorResult.valid) {
                return false;
            }*/
        },
        success: function(response, status){
            if(typeof callback === "function") {
                callback(response);
            }
        },
        error: function(e){
            if (error_callback) {
                error_callback(e);
            } else {
                utils.alert("관리자에게 문의하세요. ("+ e.statusText +")");
            }
        }
    });

    return false;
};

/**
 * Ajax 통신
 * @param url
 * @param data
 * @param callback
 * @param error_callback
 * @param async
 * @param method
 * @param data_type
 * @param is_file
 */
Utils.prototype.sendAjax = function(url, data, callback, error_callback, async, method, data_type, is_file) {
    $("button, .btn").prop("disabled",true);
    if(typeof is_file == 'undefined') is_file = false;
    var process_data = true;
    var content_type = 'application/x-www-form-urlencoded; charset=UTF-8';
    if(is_file){
        process_data = false;
        content_type = false;
        method = method=='GET' ? 'POST' : method; // file upload는 get 방식 불가
    }

    $.ajax({
        type: ((typeof method != 'undefined') ? method : 'POST'),
        url: url,
        data: data,
        async: (typeof async != 'undefined') ? async : false,
        processData: process_data,
        contentType: content_type,
        dataType: (typeof data_type != 'undefined') ? data_type : 'json'
    }).success(function (data, status, req) {
        if(typeof callback === "function") {
            callback(data);
        }
        $("button, .btn").prop("disabled", false);
    }).error(function(e) {
        if (error_callback) {
            error_callback(e);
        } else {
            utils.alert("관리자에게 문의하세요. ("+ e.statusText +")");
        }
        $("button, .btn").prop("disabled", false);
    });
}

/****************************************************************
 * Prototype: Array
 ***************************************************************/
/**
 * @param value
 * @returns {*} index
 * 배열 값의 존재 여부
 */
Array.prototype.exist = function (value) {
    for (var i in this) {
        if (this[i] == value) {
            return i;
        }
    }
    return undefined;
}

/**
 * ie7, ie8 filter
 */
if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
        "use strict";
        if (this === void 0 || this === null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function") {
            throw new TypeError();
        }
        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];
                if (fun.call(thisp, val, i, t)) {
                    res.push(val);
                }
            }
        }
        return res;
    };
}