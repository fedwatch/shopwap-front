/**
 * Created by Administrator on 2017/3/21.
 */
define(function(require,exports,module){
    require('jquery');
    $(function(){

    });
    require.async('handlebars',function(){
        var data={};
        var tpl=require('/layout/payment/directPay/creditCard.tpl');
        var template=Handlebars.compile(tpl);
        var html=template(data);
        $("#credit-card").html(html);
    });
});