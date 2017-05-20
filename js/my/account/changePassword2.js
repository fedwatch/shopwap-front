define(function (require, exports, module) {
    require('jquery');
    require('light7');
    require('siteUrl');
    require('store');


    jQuery.support.cors = true;
    $(function () {
        var $oldPassword = $("#old-userPassword");
        var $newPassword = $("#new-password");
        var $newPasswordTwo = $("#new-password-two");
        var $comIcon = $(".change-mar").find(".com-icon");
        var $inputList = $(".change-mar").find(".item-input").find("span");

        //寻找除当前input元素之外的其他input元素
        function selectInput(elem, tag, flag) {
            if (flag == true) {
                elem.parents(tag).nextAll().find("input").attr("disabled", true);
            } else {
                elem.parents(tag).nextAll().find("input").removeAttr("disabled");
            }
        }

        function oldCheackPassword() {
            var data = Mock.mock(/\/getPass/, {
                "number|6-16": 100
            });
            $.ajax({
                url: '/getPass',
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    console.log("旧密码正确");
                },
                error: function (data) {
                    console.log("旧密码错误");
                }
            });
        }

        function checkPassword(str) {
            var strong = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
            var middle = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
            var weak = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;
            var flag = true;
            if (str.length < 6 || str == "" || str.length > 16) {
                $.toast("请输入6到16位字符串");
                flag = true;
                selectInput($newPassword, "li", flag);
            } else {
                if (strong.test(str)) {
                    $.toast("密码强度强");
                }
                if (middle.test(str)) {
                    $.toast("密码强度中等");
                }
                if (weak.test(str)) {
                    $.toast("密码强度弱");
                }
                flag = false;
                selectInput($newPassword, "li", flag);
            }
        }

        function surePassword(str) {
            var flag = true;
            if (!($newPassword.val() === $newPasswordTwo.val())) {
                $.toast("两次密码不同");
                flag = false;
            } else {
                flag = true;
            }
            return flag;
        }

        $newPassword.on("blur", function () {

            var $newPasswordVal = $newPassword.val();
            checkPassword($newPasswordVal);
        });

        $(".change-mar").find(".button-big").click(function () {
            var $newPasswordTwoVal = $newPasswordTwo.val();
            var flg = surePassword($newPasswordTwoVal);
            if (flg == true) {
                $.ajax({
                    url: BASE_URL + USER_SITE_URL.UPDATE_PASSWORD.URL,
                    type: USER_SITE_URL.UPDATE_PASSWORD.METHOD,
                    dataType: USER_SITE_URL.DATATYPE,
                    data: {
                        username: store.get('userId'),
                        newPwd: newPwd,
                        pwd: pwd
                    },
                    success: function (data) {
                        if (data.authStatus == '200') {
                            $.toast(data.authMsg);
                            return window.location.href = "./changePasswordSuccess.html";
                        }
                    }
                });
            } else {
                return;
            }
        });

        //显示明文
        $comIcon.each(function (index, item) {
            $(this).click(function () {
                alert("ss");
            });
        });

    });
    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/layout/my/account/changePassword2.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#changePasswordPage2").html(html);
    });
})
