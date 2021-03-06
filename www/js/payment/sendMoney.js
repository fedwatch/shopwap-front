/**
 * Created by Administrator on 2017/3/21.
 */
define(function (require, exports, module) {
    require('jquery');
    require('siteUrl');
    require('store');
    require('light7');
    jQuery.support.cors = true;
    $(function () {
        // var isBalancePay = store.get("isBalancePay");
        // var type = store.get("type") || "payment";
        // var paymentPluginId = store.get("paymentPluginId") || "lianlianpayPlugin";
        // var mergeSn = store.get("mergeSn");
        // var amount = store.get("amount");
        // var cardId = store.get("cardId");
        // var app_request = store.get("app_request") || '3';
        // var username = store.get("username");
        // paySubmit(isBalancePay,type,paymentPluginId,mergeSn,amount,cardId,app_request,username);

        setTimeout(function () {
            var req_data = store.get("req_data");
            $("#req_data").val(req_data);
            $("#sendMoneyForm").submit();
        }, 0)
    });

    /**
     * 快捷支付
     * @param isBalancePay
     * @param type
     * @param paymentPluginId
     * @param mergeSn
     * @param amount
     * @param cardId
     * @param app_request
     * @param username
     */
    function paySubmit(isBalancePay, type, paymentPluginId, mergeSn, amount, cardId, app_request, username) {
        $.ajax({
            url: BASE_URL + PAYMENT_SITE_URL.PAY_SUBMIT.URL,
            type: PAYMENT_SITE_URL.PAY_SUBMIT.METHOD,
            dataType: PAYMENT_SITE_URL.DATATYPE,
            data: {
                isBalancePay: isBalancePay,
                type: type,
                paymentPluginId: paymentPluginId,
                mergeSn: mergeSn,
                amount: amount,
                cardId: cardId,
                app_request: app_request,
                username: username,
            },
            success: function (data) {
                if (data.status == "200" && data.su == true) {
                    $.toast("支付跳转中")
                    return location.href = '/www/html/payment/alipay/paySuccess.html'
                }
                // else{
                //     $.toast("支付失败");
                //     return history.go(-1);
                // }

            }
        })
    }


});