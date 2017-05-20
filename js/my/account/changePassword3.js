define(function (require, exports, module) {
    require('jquery');
    require("light7");
    require("varietyValidation");
    require("store");
    require("siteUrl");

    jQuery.support.cors = true;
    $(function () {
        var $userPassword = $("#userPassword");
        var $sureUserPassword = $("#userPasswordT");
        $userPassword.on("blur", function () {
            var $userPasswordVal = $userPassword.val();
            checkPassword($userPasswordVal, $userPassword, "li");
        });

        $("#next").click(function () {
            var $sureUserPasswordVal = $sureUserPassword.val();
            var flg = surePassword($userPassword, $sureUserPassword);
            var username = store.get("username");
            if (flg == true) {
                resetPassword(username,$sureUserPasswordVal);
            } else {
                return;
            }
        });

    });


    /**
     * 用户重置密码
     * @param username
     * @param newPwd
     */
    function resetPassword(username,newPwd){
        $.ajax({
            url: BASE_URL + USER_SITE_URL.RESET_PASSWORD.URL,
            type: USER_SITE_URL.RESET_PASSWORD.METHOD,
            dataType: USER_SITE_URL.DATATYPE,
            data: {
                username : username,
                newPwd : newPwd
            },
            success: function (data) {
                if (data.authStatus == "200") {
                    store.clear();
                    $.toast(data.authMsg);
                    return window.location.href = "./changePasswordSuccess.html";
                }else{
                    $.toast(data.authMsg);
                }
            }
        })
    }


    /**
     * 更新密码
     * @param username
     * @param newPwd
     * @param pwd
     */
    function updatePassword(username,newPwd,pwd){
        $.ajax({
            url: BASE_URL + USER_SITE_URL.UPDATE_PASSWORD.URL,
            type: USER_SITE_URL.UPDATE_PASSWORD.METHOD,
            dataType: USER_SITE_URL.DATATYPE,
            data: {
                username: username,
                newPwd: newPwd,
                pwd: pwd
            },
            success: function (data) {
                if (data.authStatus == '200') {
                    store.clear();
                    $.toast(data.authMsg);
                    return window.location.href = "./changePasswordSuccess.html";
                }else{
                    $.toast(data.authMsg);
                }
            }
        });
    }





    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/layout/my/account/changePassword3.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#changePasswordPage3").html(html);
    });
});
