/**
 * Created by Administrator on 2017/5/18.
 */
define(function(require,exports,module){
    require('jquery');
    // require("swiper");
    require("store");
    require("siteUrl");
    require("light7");


    jQuery.support.cors = true;
    $(function () {
        $(document).on('click','.logout',function () {
            var userId = store.get("userId");
            userLogout(userId);
        })
    });

    /**
     * 用户登出
     * @param userId
     */
    function userLogout(userId){
        $.ajax({
            url:BASE_URL+USER_SITE_URL.USER_LOGOUT.URL,
            type:USER_SITE_URL.USER_LOGOUT.METHOD,
            dataType:USER_SITE_URL.DATATYPE,
            data: {
                userId : userId
            },
            success:function (data) {
                if (data.authStatus == "200" && data.setAuthMsg == true){
                    store.clear();
                    $.toast(data.authMsg);
                    return location.href = '/html/index.html';
                }else{
                    $.toast(data.authMsg)
                }
            }
        })
    }


    // footer
    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/layout/index/footer.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#footer").html(html);
    });


    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/layout/common/footerBar.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#footer").html(html);
    });



});
