define(function(require,exports,module){
    require('jquery');
    require('light7');
    // require('mockjs');

    $(function(){
         var $phoneNumber=$("#phone-num");//获取手机号
         var $securityCode=$("#security-code");//获取验证码
         var $getVertCode=$(".vert-code");
         var $next=$("#next");
         function checkPhone(str){

               if(!(/^1[3|4|5|7|8]\d{9}$/.test(str))){
                   $.toast("请输入正确的手机号");
                   $securityCode.attr("disabled","disabled");
                  $getVertCode.css({backgroundColor:"#b2aead"});

               }else{
                   $securityCode.removeAttr("disabled");
                   $getVertCode.css({backgroundColor:"#ff503e"});

               }

         }


        $phoneNumber.on("blur",function(){
            var  $phoneNumberVal=$phoneNumber.val();
            var res=checkPhone($phoneNumberVal);
        });

        $getVertCode.click(function(){
            var $phoneNumberVal=$phoneNumber.val();
                checkPhone($phoneNumberVal);
                if($phoneNumberVal){
                    $.ajax({
                        url:"//swagger.cqdai.cn:9090/shopwap/user/sendDynamicCode",
                        type:"post",
                        dataType:'json',
                        cache:false,
                        async:false,
                        data: {userPhone: $phoneNumberVal,codeFlag:"1"},
                        success:function (data) {
                            console.log(data);
                            var spData = data;
                            if (spData.authStatus == "200" && spData.setAuthMsg == true){
                                $.toast(spData.authMsg,2000);
                            }
                        }
                    })
                }else{
                    $.toast("请输入正确的手机号");
                }
                $("#next").click(function(){
                    window.location.href="./changePassword3.html";
                })
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
