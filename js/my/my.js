/**
 * Created by Administrator on 2017/3/10.
 */
define(function(require,exports,module){
    require('jquery');
    // require("swiper");
    require("store");
    require("siteUrl");
    require("/js/utils/getCurrentPage");

    jQuery.support.cors = true;
    $(function () {
        getCurrentPage();

        $(document).on('click','.logoutButton',function () {
            var userId = store.get('userId');
            userLogout(userId);
        })

    });

    function userLogout(userId){
        $.ajax({
            url:BASE_URL+USER_SITE_URL.USER_LOGOUT.URL,
            type:USER_SITE_URL.USER_LOGOUT.METHOD,
            dataType:USER_SITE_URL.DATATYPE,
            cache:false,
            async:false,
            data: {
                userId: userId
            },
            success:function (data) {
                if(data.authStatus == '200'){
                    $.toast(data.authMsg)
                }
            }
        });
    }




    // my_header
    require.async('handlebars',function(){
        var data = {
            data:'7795'
        };

        var tpl = require('/layout/my/common/header.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#my_header").html(html);
    });



    // userColumn
    require.async('handlebars',function(){
        var data = {
            data:'7795'
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

    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/layout/common/footerBar.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#footer").html(html);
    });



});
