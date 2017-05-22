/**
 * Created by Administrator on 2017/3/10.
 */
define(function (require, exports, module) {
    require('jquery');
    // require("swiper");
    require("store");
    require("siteUrl");
    require("/js/utils/getCurrentPage");

    jQuery.support.cors = true;
    var username = store.get("username");
    $(function () {
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
                // if (data.authStatus == '200') {
                    require.async('handlebars', function () {
                        var tpl = require('/layout/my/common/header.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#my_header").html(html);
                    });
                // }
                // else if (data.authStatus == '403') {
                    // store.clear();
                    // return location.href = '../my/login/login.html';
                // }
            }
        });
    }






    // userColumn
    require.async('handlebars', function () {
        var data = {
            data: '7795'
        };
        var tpl = require('/layout/my/userColumn.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#userColumn").html(html);
    });


    // footer
    // require.async('handlebars',function(){
    //     var data = {};
    //     var tpl = require('/layout/index/footer.tpl');
    //     var template = Handlebars.compile(tpl);
    //     var html = template(data);
    //     $("#footer").html(html);
    // });

    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/layout/common/footerBar.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#footer").html(html);
    });


});
