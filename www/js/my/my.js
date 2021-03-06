/**
 * Created by Administrator on 2017/3/10.
 */
define(function (require, exports, module) {
    require("siteUrl");
    require('jquery');
    require("light7");
    require("store");
    require("getCurrentPage");

    jQuery.support.cors = true;
    var username = store.get("username");

    getIndex(username);
    getCurrentPage();


    function getIndex(username) {
        $.ajax({
            url: BASE_URL + MEMBER_SITE_URL.INDEX.URL,
            type: MEMBER_SITE_URL.INDEX.METHOD,
            dataType: MEMBER_SITE_URL.DATATYPE,
            data: {
                username: username
            },
            cache: true,
            async: false,
            success: function (data) {
                if (data.authStatus == '200') {
                    require.async('handlebars', function () {
                        require.async('hbCompare', function () {
                            var tpl = require('/zqVue/shopwap-front/www/layout/my/common/header.tpl');
                            var template = Handlebars.compile(tpl);
                            var html = template(data);
                            $("#my_header").html(html);
                            $(".user-id").text(username);

                            // userColumn
                            require.async('handlebars', function () {
                                var tpl = require('/zqVue/shopwap-front/www/layout/my/userColumn.tpl');
                                var template = Handlebars.compile(tpl);
                                var html = template(data);
                                $("#userColumn").html(html);
                            });
                        });
                    });
                }
                else if (data.authStatus == '403') {
                    store.clear();
                    $.toast(data.authMsg);
                    return location.href = '../my/login/login.html';
                }
            }
        });
    }

    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/zqVue/shopwap-front/www/layout/common/footerBar.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#footer").html(html);
    });


});
