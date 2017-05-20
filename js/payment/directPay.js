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
        $("#bind-button").click(function () {
            var bankno = $("#bankno").val();
            var flag = bankCheck(bankno);
            // setTimeout(function () {
            //     location.href = "./creditCard.html";
            // }, 3000);

            if (flag === true) {
                $.toast("银行卡正确");
                store.set("bankCardNo",bankno);
                setTimeout(function () {
                    location.href = "./creditCard.html";
                }, 2000);
            } else {
                $.toast("银行卡账号错误");
                return;
            }
        });
    });


    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/layout/payment/directPay/bindCard.tpl');
        //var tpl=require('/layout/payment/directPay/creditCard.tpl');
        // var tpl=require('/layout/payment/directPay/depositCard.tpl');
        //var tpl=require('/layout/payment/directPay/bindCardDetail.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#bind-card").html(html);
    });
});