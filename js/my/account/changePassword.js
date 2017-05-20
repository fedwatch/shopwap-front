define(function (require, exports, module) {
    require('jquery');
    require('light7');
    require('siteUrl');
    require('store');
    // require('mockjs');

    jQuery.support.cors = true;
    $(function () {
        var $phoneNumber = $("#phone-num");//获取手机号
        var $securityCode = $("#security-code");//获取验证码
        var $getVertCode = $(".vert-code");
        var $next = $("#next");

        function checkPhone(str) {
            if (!(/^1[3|4|5|7|8]\d{9}$/.test(str))) {
                $.toast("请输入正确的手机号");
                $securityCode.attr("disabled", "disabled");
                $getVertCode.css({backgroundColor: "#b2aead"});

            } else {
                $securityCode.removeAttr("disabled");
                $getVertCode.css({backgroundColor: "#ff503e"});

            }

        }


        $phoneNumber.on("blur", function () {
            var $phoneNumberVal = $phoneNumber.val();
            var res = checkPhone($phoneNumberVal);
        });

        $(document).on('click','.vert-code',function () {
            var $phoneNumberVal = $phoneNumber.val();
            var currentUsername = store.get("username");
            checkPhone($phoneNumberVal);
            if($phoneNumberVal == currentUsername){
                if ($phoneNumberVal) {
                    $.ajax({
                        url: BASE_URL + USER_SITE_URL.SEND_DYNAMIC_CODE.URL,
                        type: USER_SITE_URL.SEND_DYNAMIC_CODE.METHOD,
                        dataType: USER_SITE_URL.DATATYPE,
                        cache: false,
                        async: false,
                        data: {userPhone: $phoneNumberVal, codeFlag: "2"},
                        success: function (data) {
                            console.log(data);
                            if (data.authStatus == "200" && data.setAuthMsg == true) {
                                $.toast(data.authMsg, 2000);
                            }
                        }
                    })
                } else {
                    $.toast("请输入正确的手机号");
                }
            }else{
                $.toast("您的请求非法后台已记录数据！")
            }

            $("#next").click(function () {
                window.location.href = "./changePassword3.html";
            })
        });


    });
    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/layout/my/account/changePassword.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#changePasswordPage").html(html);
    });
})
