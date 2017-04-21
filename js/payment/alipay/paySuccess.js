define(function(require,exports,module){
    require("jquery");
    require.async("handlebars",function(){
        var data={};
        var tpl=require('/layout/payment/alipay/paySuccess.tpl');
        var template=Handlebars.compile(tpl);
        var html=template(data);
        $("#paySuccess").html(html);
    })
})
