/**
 * Created by CodeHolic on 2018-03-09.
 */

window.container = {
    "layers": {},
    "editors": []
};

$.fn.extend({
    /**
     * @param json
     * @returns {*|jQuery|HTMLElement}
     */
    "binding": function(json, is_outer) {
        var html = (is_outer === true) ? $(this).get(0).outerHTML : $(this).html();
        for(var key in json) {
            html = utils.replaceAll(html, "{"+ key +"}", json[key] != null ? json[key] : "");
        }
        return (is_outer === true) ? $(html) : $(this).html(html);
    },
    /**
     * @param options
     *      options.dimmed: boolean
     *      options.open: callback function
     *      options.close: callback function
     * @returns {*|jQuery|HTMLElement}
     */
    "layer": function(options) {

        options = (options) ? options : {};
        options.dimmed = options.dimmed != undefined ? options.dimmed : true;

        var $this = $(this);
        var id = $(this).attr("id");

        if (!window.container.layers[id]) {
            window.container.layers[id] = $(this).clone(true);
        } else {
            $this = window.container.layers[id].clone(true);
            $(this).parent().append($this);
            $(this).remove();
        }

        $this.data("loaded", false);

        if (options.dimmed == true) {
            utils.dimmed({"open": true, "duration": 300});
        }
        $this.fadeIn(function() {
            $this.data("loaded", true);
        });

        if (options.open) {
            options.open($this);
        }

        if ($this.outerHeight() < $(document).height()) {
            $this.css('margin-top', '-'+ $this.outerHeight() / 2 +'px');
        } else {
            $this.css('top', '0px');
        }

        if ($this.outerWidth() < $(document).width()) {
            $this.css('margin-left', '-'+ $this.outerWidth() / 2 +'px');
        } else {
            $this.css('left', '0px');
        }

        $this.find('.close').on("click", function(e) {
            $this.fadeOut(0);
            if ($(".layer-pop-wrap:visible").length == 0) {
                if (options.dimmed == true) {
                    utils.dimmed({"open": false, "duration": 0});
                }
            }
            if (options.close) {
                options.close($this);
            }
            e.preventDefault();
        });

        return $this;
    },
    "simpleLayer": function() {

        var $this = $(this);

        $this.data("loaded", false);

        utils.dimmed({"open": true, "duration": 300});

        $this.fadeIn(function() {
            $this.data("loaded", true);
        }).addClass("simple-layer");

        $this.find('.close').on("click", function(e) {
            $this.fadeOut(0);
            utils.dimmed({"open": false, "duration": 0});
            e.preventDefault();
        });

        return $(this);
    } ,
    /**
     * @param callback
     * @returns {*|jQuery|HTMLElement}
     */
    "close": function(callback) {
        $(this).fadeOut(0);
        utils.dimmed({"open": false, "duration": 0});
        if ($(".layer-pop-wrap:visible").length == 0) {
        }
        if (callback) {
            callback($(this));
        }
        return $(this);
    },
    "mobileLayer": function(options) {

        options = (options) ? options : {};

        var $this = $(this);
        var id = $(this).attr("id");

        if (!window.container.layers[id]) {
            window.container.layers[id] = $(this).clone(true);
        } else {
            $this = window.container.layers[id].clone(true);
            $(this).parent().append($this);
            $(this).remove();
        }

        if (options.open) {
            options.open($this);
        }

        $("body").addClass('fix');

        $this.data("loaded", false);
        $this.addClass('open').focus(); //.attr("tabindex", "0")
        $this.on("animationend webkitAnimationEnd oAnimationEnd", function() {
            $this.data("loaded", true);
        });

        $this.find('.close, .cancel').on('click', function() {
            $this.mobileClose();
        });

        return $this;
    },
    "mobileClose": function() {

        var $this = $(this);
            $this.removeClass('open');

        $("body").removeClass('fix');

        self.focus();

        return $this;
    },
    /**
     * tab event
     * @param callback
     * @returns {*|jQuery|HTMLElement}
     */
    "tabs": function(callback) {

        var $tabs = $(this);

        $tabs.each(function() {

            var $tab = $(this);

            $tab.find("a").off("click").on("click", function(e) {

                var $target = $($(this).attr("href"));

                $tabs.each(function() {
                    $($(this).find("a").attr("href")).each(function() {
                        $(this).addClass("hide");
                    });
                }).removeClass("on");

                $tab.addClass("on");

                if (callback) {
                    callback($tab, $target);
                }

                $target.removeClass("hide");

                e.preventDefault();
            });
        });

        $tabs.eq(0).find("a").trigger("click");

        return $(this);
    },
    /**
     * checkbox event
     * @param options {checked: boolean}
     * @param callback
     * @returns {*|jQuery|HTMLElement}
     */
    "checkbox": function(checked) {

        var options = {"active": "on"};
        var $checkbox = $(this);

        if (checked === undefined) {
            $checkbox.prop("checked", !$checkbox.prop("checked"));
        } else {
            $checkbox.prop("checked", checked);
        }

        if ($checkbox.prop("checked")) {
            $checkbox.closest("label").addClass(options.active);
        } else {
            $checkbox.closest("label").removeClass(options.active);
        }

        return $(this);
    },
    "selectbox": function(data) {
        $(this).empty();
        for(var i = 0; i < data.length; i++) {
            var $option = $("<option value='"+ data[i].value +"'>"+ data[i].text +"</option>");
            for(var attribute in data[i]) {
                if (attribute != "value" && attribute != "text") {
                    $option.attr(attribute, data[i][attribute]);
                }
            }
            $(this).append($option);
        }
        return $(this);
    },
    /**
     * input value to array
     * @param attribute: string
     * @returns {Array}
     */
    "getValues": function(attribute) {
        var result = [];
        $(this).each(function() {
            var value = $(this).val();
            if (attribute) {
                value = $(this).attr(attribute);
            }
            result.push(value);
        });
        return result;
    }
});