/**
 * Created by Administrator on 2017/3/10.
 */
define(function (require, exports, module) {
    require('jquery');
    require("light7");
    require("store");
    require("siteUrl");
    require("getCurrentPage");
    require('cookie');
    // var session = require("session");


    jQuery.support.cors = true;

    // console.log(JSESSIONID)

    $(function () {
        var username = store.get("username");
        console.log(username);
        getIndex(username);
        getCurrentPage();

    });


    function getIndex(username){
        $.ajax({
            url: BASE_URL + MEMBER_SITE_URL.INDEX.URL,
            type: MEMBER_SITE_URL.INDEX.METHOD,
            dataType: MEMBER_SITE_URL.DATATYPE,
            data: {
                username: username
            },
            success: function (data) {
                if (data.authStatus == '200') {
                    require.async('handlebars', function () {
                        require.async('hbCompare', function () {
                            var tpl = require('/m/layout/my/common/header.tpl');
                            var template = Handlebars.compile(tpl);
                            var html = template(data);
                            $("#my_header").html(html);
                            $(".user-id").text(username);

                            // userColumn
                            require.async('handlebars', function () {
                                var tpl = require('/m/layout/my/userColumn.tpl');
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
        var tpl = require('/m/layout/common/footerBar.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#footer").html(html);
    });


});
