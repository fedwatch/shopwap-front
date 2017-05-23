/**
 * Created by Administrator on 2017/5/18.
 */
define(function(require,exports,module){
    require('jquery');
    require("siteUrl");
    require("store");
    require("light7");


    jQuery.support.cors = true;
    $(function () {
        $(document).on('click','.logout',function () {
            var username = store.get("username");
            userLogout(username);
        })
    });

    /**
     * 用户登出
     * @param username
     */
    function userLogout(username){
        $.ajax({
            url:BASE_URL+USER_SITE_URL.USER_LOGOUT.URL,
            type:USER_SITE_URL.USER_LOGOUT.METHOD,
            dataType:USER_SITE_URL.DATATYPE,
            data: {
                username : username
            },
            success:function (data) {
                if (data.authStatus == "200"){
                    store.clear();
                    $.toast(data.authMsg);
                    return location.href = '/m/html/index.html';
                }else{
                    $.toast(data.authMsg)
                }
            }
        })
    }






});
