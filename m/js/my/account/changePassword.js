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

        /**
         * 获取验证码按钮 失败
         * @type {{background: string, color: string, border: string}}
         */
        var $getSMSCodeBtn_FAILED = {
            height: "1.94rem",
            lineHeight: "1.94rem",
            backgroundColor: "#999",
            borderRadius: "1rem",
            color: "#fff",
            fontSize: "0.789rem",
            padding: "0px 0.5rem",
            marginLeft: "0.758rem"
        };
        /**
         * 获取验证码按钮 成功
         * @type {{background: string, color: string, border: string}}
         */
        var $getSMSCodeBtn_SUCCESS = {
            height: "1.94rem",
            lineHeight: "1.94rem",
            backgroundColor: "#ff503e",
            borderRadius: "1rem",
            color: "#fff",
            fontSize: "0.789rem",
            padding: "0px 0.5rem",
            marginLeft: "0.758rem"
        };


        function checkPhone(str) {
            if (!(/^1[3|4|5|7|8]\d{9}$/.test(str))) {
                $.toast("请输入正确的手机号");
                $securityCode.attr("disabled", "disabled");
                $(".vert-code").css({backgroundColor: "#b2aead"});

            } else {
                $securityCode.removeAttr("disabled");
                $(".vert-code").css({backgroundColor: "#ff503e"});

            }

        }


        $("#phone-num").on("blur", function () {
            var $phoneNumberVal = $phoneNumber.val();
            var res = checkPhone($phoneNumberVal);
        });

        var vertCodeState = true;
        $(document).on('click', '.vert-code', function () {
            if(vertCodeState == true){
                var $phoneNumberVal = $("#phone-num").val();
                var currentUsername = store.get("username");
                checkPhone($phoneNumberVal);
                if ($phoneNumberVal == currentUsername) {
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
                                if (data.authStatus == "200") {
                                    $.toast(data.authMsg, 2000);
                                }
                                vertCodeState = false
                                getSMSTimer();
                                function getSMSTimer() {
                                    var smsCodeBtn = '';
                                    var SETTIMESECOND = 60;
                                    var nums = SETTIMESECOND;
                                    $(".vert-code").css($getSMSCodeBtn_FAILED);
                                    //将按钮置为 不可点击
                                    $(".vert-code").attr("disabled", true);
                                    $(".vert-code").text(nums + ' s');
                                    smsCodeBtn = setInterval(function () {
                                        nums--;
                                        if (nums > 0) {
                                            $(".vert-code").text(nums + ' s');
                                        } else {
                                            clearInterval(smsCodeBtn); //清除js定时器
                                            //将按钮置为 可点击
                                            $(".vert-code").css($getSMSCodeBtn_SUCCESS);
                                            $(".vert-code").attr("disabled", false);
                                            $(".vert-code").text('获取验证码');
                                            nums = SETTIMESECOND; //重置时间
                                            vertCodeState = true
                                        }
                                        console.log(vertCodeState);
                                    }, 1000); //一秒执行一次

                                }
                            }
                        })
                    } else {
                        $.toast("请输入正确的手机号");
                    }
                } else {
                    $.toast("您的请求非法后台已记录数据！")
                }


                $("#next").click(function () {
                    window.location.href = "./changePassword3.html";
                })
            }
        });


    });
    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/m/layout/my/account/changePassword.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#changePasswordPage").html(html);
    });
})
