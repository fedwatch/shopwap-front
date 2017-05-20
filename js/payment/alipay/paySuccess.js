define(function(require,exports,module){
    require("jquery");
    require("store");
    require("siteUrl");
    require("parseUrl");

    $(function(){
        var href = location.href;
        var username = store.get("username");
        var n = parseURL(href);
        var paymentSn = n.params.paymentSn;
        paymentView(username,paymentSn);
    });



    function paymentView(username,paymentSn){
        $.ajax({
            url:BASE_URL+ORDER_SITE_URL.PAYMENT_VIEW.URL,
            dataType:ORDER_SITE_URL.DATATYPE,
            type:ORDER_SITE_URL.PAYMENT_VIEW.METHOD,
            data:{
                username:username,
                paymentSn:paymentSn
            },
            success:function (data) {
                if(data.authStatus == '200'){
                    require.async("handlebars",function(){
                        var tpl=require('/layout/payment/alipay/paySuccess.tpl');
                        var template=Handlebars.compile(tpl);
                        var html=template(data);
                        $("#paySuccess").html(html);
                    })
                }

            }
        });
    }

    /**
     * 检查支付是否完成,根据支付订单检查
     * @param username
     * @param mergeSn
     */
    function checkPayment(username, mergeSn){
        $.ajax({
            url:BASE_URL+ORDER_SITE_URL.CHECK_PAYMENT.URL,
            dataType:ORDER_SITE_URL.DATATYPE,
            type:ORDER_SITE_URL.CHECK_PAYMENT.METHOD,
            data:{
                username:username,
                mergeSn:mergeSn
            },
            success:function (data) {
                console.log(data);
            }
        });
    }


})
