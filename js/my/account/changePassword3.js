define(function (require, exports, module) {
    require('jquery');
    require("light7");
    require("varietyValidation");
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
            if (flg == true) {
                window.location.href = "./changePasswordSuccess.html";
            } else {
                return;
            }
        });

    });
    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/layout/my/account/changePassword3.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#changePasswordPage3").html(html);
    });
});
