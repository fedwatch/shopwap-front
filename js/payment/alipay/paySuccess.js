define(function(require,exports,module){
    require("jquery");
    require("store");
    require("siteUrl");

    $(function(){

    });

    function checkPayment(username, mergeSn){
        $.ajax({
            url:BASE_URL+ORDER_SITE_URL.CHECK_PAYMENT.URL,
            dataType:ORDER_SITE_URL.DATATYPE,
            type:ORDER_SITE_URL.CHECK_PAYMENT.METHOD,
            data:{
                username:username,
                mergeSn:mergeSn,
            },
            success:function (data) {

            }
        });
    }

    require.async("handlebars",function(){
        var data={};
        var tpl=require('/layout/payment/alipay/paySuccess.tpl');
        var template=Handlebars.compile(tpl);
        var html=template(data);
        $("#paySuccess").html(html);
    })
})
