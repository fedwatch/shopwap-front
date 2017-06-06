/**
 * Created by Administrator on 2017/3/21.
 */
define(function (require, exports, module) {
    require('jquery');
    require('light7');
    require('bankCheck');
    require('store');

    jQuery.support.cors = true;
    //银行卡验证方法
    $(function () {
        $(document).on("click","#bind-button",function () {
            var bankno = $("#bankno").val();
            var flag = bankCheck(bankno);
            if (flag === true) {
                $.toast("银行卡正确");
                store.set("bankCardNo",bankno);
                setTimeout(function () {
                    location.href = "./creditCard.html";
                }, 1000);
            } else {
                $.toast("银行卡账号错误");
                return;
            }
        });
    });


    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/zqVue/shopwap-front/www/layout/payment/directPay/bindCard.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#bind-card").html(html);
    });
});