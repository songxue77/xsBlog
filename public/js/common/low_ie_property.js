/**
 * IE 저 버전에서 지원되지 않는 prototype 세팅
 */

Function.prototype.bind = Function.prototype.bind || function(b) {
    if (typeof this !== "function") {
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var a = Array.prototype.slice;
    var f = a.call(arguments, 1);
    var e = this;
    var c = function() {};
    var d = function() {
        return e.apply(this instanceof c ? this : b || window, f.concat(a.call(arguments)));
    };

    c.prototype = this.prototype;
    d.prototype = new c();

    return d;
};

Array.prototype.indexOf = function (elt /*, from*/) {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
        ? Math.ceil(from)
        : Math.floor(from);
    if (from < 0)
        from += len;

    for (; from < len; from++) {
        if (from in this &&
            this[from] === elt)
            return from;
    }
    return -1;
};
