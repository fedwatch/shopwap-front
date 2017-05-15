/**
 * Created by Administrator on 2017/3/21.
 */
define(function(require,exports,module){
    require('jquery');
    require('siteUrl');
    require('store');

    $(function () {
        var isBalancePay = store.get("isBalancePay");
        var type = store.get("type");
        var paymentPluginId = store.get("paymentPluginId");
        var mergeSn = store.get("mergeSn");
        var amount = store.get("amount");
        var cardId = store.get("cardId");
        var app_request = store.get("app_request");
        var username = store.get("username");
        paySubmit(isBalancePay,type,paymentPluginId,mergeSn,amount,cardId,app_request,username);
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
    function paySubmit(isBalancePay,type ,paymentPluginId,mergeSn,amount ,cardId ,app_request ,username){
        $.ajax({
            url:BASE_URL+PAYMENT_SITE_URL.BOUND_CARD_PAY.URL,
            type:PAYMENT_SITE_URL.BOUND_CARD_PAY.METHOD,
            dataType:PAYMENT_SITE_URL.DATATYPE,
            data:{
                isBalancePay: isBalancePay,
                type: type,
                paymentPluginId: paymentPluginId,
                mergeSn: mergeSn,
                amount: amount,
                cardId: cardId,
                app_request: app_request,
                username: username,
            },
            success:function (data) {
                console.log(data);
            }
        })
    }



    function sendMoney(){

        $.ajax({
            url:BASE_URL+PAYMENT_SITE_URL.PAY_SUBMIT.URL,
            dataType:PAYMENT_SITE_URL.DATATYPE,
            type:PAYMENT_SITE_URL.PAY_SUBMIT.METHOD,
            data:{

            },
            success:function (data) {

            }
        });

    }
});