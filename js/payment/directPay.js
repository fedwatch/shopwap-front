/**
 * Created by Administrator on 2017/3/21.
 */
define(function(require,exports,module){
        require('jquery');
        require('light7');
        require('bankCheck');
         //银行卡验证方法
        $(function(){
            $("#bind-button").click(function(){
                var bankno=$("#bankno").val();
                var flag=bankCheck(bankno);
                if(flag===true){
                    $.toast("银行卡正确",2000);
                    setTimeout(function(){
                        location.href="www.baidu.com";
                    },3000);
                }else{
                    $.toast("银行卡账号错误",2000);
                    return;
                }
            });
        })

     require.async('handlebars',function(){
       var data={};
       var tpl=require('/layout/payment/directPay/bindCard.tpl');
         //var tpl=require('/layout/payment/directPay/creditCard.tpl');
        // var tpl=require('/layout/payment/directPay/depositCard.tpl');
         //var tpl=require('/layout/payment/directPay/bindCardDetail.tpl');
       var template=Handlebars.compile(tpl);
       var html=template(data);
       $("#bind-card").html(html);
   });
});