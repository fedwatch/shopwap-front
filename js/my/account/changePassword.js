define(function(require,exports,module){
    require('jquery');
    require('light7');
    require('mockjs');

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
                    Mock.mock(/\/getSMSCode$/, {
                        'result|1': [{
                            'status': true,
                        }]
                    });

                    $.ajax({
                        url:'/getSMSCode',
                        type:'post',
                        dataType:'json',
                        data:$phoneNumberVal,
                        success:function (data) {
                            var data = data['result'];
                            if (data.status && data.status == true){
                                console.log("验证码获取成功");
                            }
                           // getSMSTimer();


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
