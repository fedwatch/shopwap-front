define(function(require,exports,module){
    require('jquery');
    require('light7');
    require('mockjs');

    $(function(){

         var $phoneNumber=$("#phone-num");//获取手机号
         var $securityCode=$("#security-code");//获取验证码
          var $vertCode=$(".vert-code");
          var $next=$("#next");
         function checkPhone(str){

               if(!(/^1[3|4|5|7|8]\d{9}$/.test(str))){
                   $securityCode.attr("disabled","disabled");
                   $vertCode.css({backgroundColor:"#b2aead"})
                  $("#userPhoneError").css({display:"block"})
               }else{
                   $securityCode.attr("disabled",false);
                   $("#userPhoneError").css({display:"none"})
                   $next.click(function(){
                       window.location.href="./changePassword3.html";
                   })
               }
         }
        $phoneNumber.on("blur",function(){
           var  $textPhoneVal=$phoneNumber.val();
            checkPhone($textPhoneVal);
        });


    });
    require.async('handlebars',function(){
        var data={};
        var tpl=require('/layout/my/account/changePassword.tpl');
        var template=Handlebars.compile(tpl);
        var html=template(data);
        $("#changePasswordPage").html(html);
    });
})
