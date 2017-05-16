/**
 * Created by Administrator on 2017/3/21.
 */
define(function(require,exports,module){
    require('jquery');
    require('store');
    require('siteUrl');
    require('light7');
    require('user');

    jQuery.support.cors = true;
    $(function(){
        var bankCardNo = store.get("bankCardNo");
        var username = store.get("username");
        var isBalancePay = store.get("isBalancePay") || false;
        var type = store.get("type") || "payment";
        var paymentPluginId = store.get("paymentPluginId") || "lianlianpayPlugin";
        var mergeSn = store.get("mergeSn")||2017051635051;
        var amount = store.get("amount")||0.01;
        var app_request = store.get("app_request")|| '3';
        var cardType = store.get("cardType")|| '1';

        var cardId = store.get("cardId");
        bankcardBind(bankCardNo,username);


        $(document).on('click','.verBtn',function () {
            var $this = $(this);
            sendDynamicCode(username,'3');
        }) ;
        $(document).on('click','.firstBind',function () {
            var $this = $(this);
            var bankCode = store.get("bankCode");
            var bankCardType = store.get("bankCardType");
            var bankName   = store.get("bankName");
            var phoneNum   = store.get("username");
            var cardNum  = $("#cardNum").val();
            var trueUsername  = store.get("username");
            var verifyCode   = $("#verifyCode").val();
            var verificationCode = $("#verificationCode").val() || null;
            var expiryDate = $("#creditMonth").val() + $("#creditYear").val() || null;
            var bankCardNo  = store.get("bankCardNo");

            boundCardPay(isBalancePay, type, paymentPluginId, mergeSn, amount, app_request, bankCardType, bankCode, bankCardNo, cardType, cardNum, phoneNum, verificationCode, expiryDate, verifyCode, trueUsername, bankName)
            // location.href = './alipay/paySuccess.html'

        })

    });


    function sendDynamicCode(userPhone,codeFlag){
        $.ajax({
            url: BASE_URL + USER_SITE_URL.SEND_DYNAMIC_CODE.URL,
            type: USER_SITE_URL.SEND_DYNAMIC_CODE.METHOD,
            dataType: USER_SITE_URL.DATATYPE,
            data: {
                userPhone : userPhone ,
                codeFlag : codeFlag ,
            },
            success: function (data) {
                console.log(data);
                if(data.authStatus == '200'){
                    $.toast(data.authMsg,1500);
                }else{
                    $.toast(data.authMsg,1500);
                }
            }
        })
    }


    /**
     * 根据卡号查询卡信息
     * @param bankCardNo
     * @param username
     */
    function bankcardBind(bankCardNo, username) {
        $.ajax({
            url: BASE_URL + PAYMENT_SITE_URL.BANKCARD_BIND.URL,
            type: PAYMENT_SITE_URL.BANKCARD_BIND.METHOD,
            dataType: PAYMENT_SITE_URL.DATATYPE,
            data: {
                bankCardNo: bankCardNo,
                username: username,
            },
            success: function (data) {
                require.async('handlebars',function(){
                    require.async('transCommonPay',function(){
                        var tpl=require('/layout/payment/directPay/creditCard.tpl') ;
                        var template=Handlebars.compile(tpl);
                        var html=template(data);
                        $("#credit-card").html(html);
                    });
                });

                store.set("bankCode",data.memberBank.bankCode)
                store.set("bankCardType",data.memberBank.bankCardType);
                store.set("bankCardNo",data.memberBank.bankCardNo);
                store.set("bankName",data.memberBank.bankName);
            }
        })
    }


    /**
     * 绑定银行卡并支付
     * @param isBalancePay
     * @param type
     * @param paymentPluginId
     * @param mergeSn
     * @param amount
     * @param app_request
     * @param bankCardType
     * @param bankCode
     * @param bankCardNo
     * @param cardType
     * @param cardNum
     * @param phoneNum
     * @param verificationCode
     * @param expiryDate
     * @param verifyCode
     * @param username
     * @param bankName
     */
    function boundCardPay(isBalancePay, type, paymentPluginId, mergeSn, amount, app_request, bankCardType, bankCode, bankCardNo, cardType, cardNum, phoneNum, verificationCode, expiryDate, verifyCode, username, bankName) {
        $.ajax({
            url: BASE_URL + PAYMENT_SITE_URL.BOUND_CARD_PAY.URL,
            type: PAYMENT_SITE_URL.BOUND_CARD_PAY.METHOD,
            dataType: PAYMENT_SITE_URL.DATATYPE,
            data: {
                isBalancePay: isBalancePay,
                type: type,
                paymentPluginId: paymentPluginId,
                mergeSn: mergeSn,
                amount: amount,
                app_request: app_request,
                bankCardType: bankCardType,
                bankCode: bankCode,
                bankCardNo: bankCardNo,
                cardType: cardType,
                cardNum: cardNum,
                phoneNum: phoneNum,
                verificationCode: verificationCode,
                expiryDate: expiryDate,
                verifyCode: verifyCode,
                username: username,
                bankName: bankName
            },
            success: function (data) {
                console.log(data);
                $.toast(data.authMsg,1500);
            }
        })
    }


    // require.async('handlebars',function(){
    //     var data={};
    //     var tpl=require('/layout/payment/directPay/creditCard.tpl');
    //     var template=Handlebars.compile(tpl);
    //     var html=template(data);
    //     $("#credit-card").html(html);
    // });
});