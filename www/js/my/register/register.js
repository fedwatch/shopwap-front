7/**
 * Created by Administrator on 2017/3/10.
 */
define(function(require,exports,module){
    require('jquery');
    require('swiper');
    require('light7');
    require('store');
    require('rsa-all');
    require('siteUrl');

    var genData = {};


    jQuery.support.cors = true;
    $(function () {
        var $userPhone = $("#userPhone");//手机号
        var $userPass = $("#userPass");//登录密码
        var $getSMSCodeBtn = $("#getSMSCodeBtn");//获取验证码按钮
        var $userPassError = $("#userPassError");//登录密码错误提示信息
        var $userPhoneError = $("#userPhoneError");//手机号错误提示信息
        var $userSMSCodeError = $("#userSMSCodeError");//验证码错误提示信息
        var $smsCode = $("#smsCode");//SMS验证码
        var $registerBtn = $('#registerBtn');//立即注册按钮
        var registerResult = {};//内部数据的状态集

        /**
         * 获取验证码按钮 失败
         * @type {{background: string, color: string, border: string}}
         */
        var $getSMSCodeBtn_FAILED = {
            background:"#c7c7c7",
            color:"#515151",
            border:"#c7c7c7",
            borderTopLeftRadius:"0",
            borderTopRightRadius:"2rem",
            borderBottomRightRadius: "2rem",
            borderBottomLeftRadius: "0",
            width: "5.24rem"
        };
        /**
         * 获取验证码按钮 成功
         * @type {{background: string, color: string, border: string}}
         */
        var $getSMSCodeBtn_SUCCESS = {
            background:"#ffdf0b",
            border:"0",
            color:"#515151",
            borderTopLeftRadius:"0",
            borderTopRightRadius:"2rem",
            borderBottomRightRadius: "2rem",
            borderBottomLeftRadius: "0",
            width: "5.24rem"
        };
        /**
         * 注册按钮 失败
         * @type {{background: string, color: string, border: string}}
         */
        var $registerBtn_FAILED = {
            background:"#c7c7c7",
            color:"#515151",
            border:"#c7c7c7",
        };
        /**
         * 注册按钮 成功
         * @type {{background: string, color: string, border: string}}
         */
        var $registerBtn_SUCCESS = {
            background:"#f84b15",
            color:"#fff",
            border:"#f84b15"
        };


        $(document).on('blur','#userPhone',function () {
            var userPhoneVal =  $userPhone.val();
            checkMobile(userPhoneVal);
        });


        $(document).on('click','#registerBtn',function () {
            console.log(registerResult);
            if(registerResult.userPass == true && registerResult.userPhone == true && registerResult.smsCode == true){
                $registerBtn.addClass('button-success').css($registerBtn_SUCCESS);
                var enPassword;
                $.ajax({
                    url: BASE_URL+USER_SITE_URL.PUBLIC_KEY.URL,
                    type: USER_SITE_URL.PUBLIC_KEY.METHOD,
                    cache:true,
                    async:false,
                    dataType:USER_SITE_URL.DATATYPE,
                    success: function(data) {
                        var rsaKey = new RSAKey();
                        rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
                        enPassword = hex2b64(rsaKey.encrypt($userPass.val()));
                    }
                });
                $.ajax({
                    url:BASE_URL+USER_SITE_URL.USER_REGISTER.URL,
                    dataType:USER_SITE_URL.DATATYPE,
                    type:USER_SITE_URL.USER_REGISTER.METHOD,
                    cache:true,
                    async:false,
                    data:{
                        username:$.trim($userPhone.val()),
                        enPassword:enPassword,
                        smsCode:$.trim($smsCode.val())
                    },
                    success:function (data) {
                        if(data.authStatus == "200"){
                            $.toast(data.authMsg,3000);
                            setTimeout(function(){
                                return location.href="/www/html/my/my.html"
                            },3000);

                        }else{
                            $.toast(data.authMsg);
                        }
                    }
                });
            }else if (registerResult.userPass == false || registerResult.userPhone == false || registerResult.smsCode == false){
                $registerBtn.removeClass('button-success').css($registerBtn_FAILED);
            }else if(typeof registerResult == 'undefined'){
                $.toast("请填写你的手机号和登录密码！");
            }
        })


        function checkMobile(str) {
            var regex = /^1\d{10}$/;
            if (regex.test(str)) {
                console.log("手机号码正确");
                $userPhoneError.hide();
                $getSMSCodeBtn.css($getSMSCodeBtn_SUCCESS).attr("disabled",false);
                registerResult.userPhone = true;
                $userPhone.closest('li.register_input').removeClass("error");
                console.log(registerResult);
                // checkRegisterBtn();
            } else {
                console.log("手机号码不正确");
                $userPhoneError.show();
                $getSMSCodeBtn.css($getSMSCodeBtn_FAILED).attr("disabled",true);
                registerResult.userPhone = false;
                $userPhone.closest('li.register_input').addClass("error");
                console.log(registerResult);
                // checkRegisterBtn();
            }
        }

        function checkPassword(str) {
            if(str.length <8 || str == '' || str.length > 16){
                $userPassError.show();
                console.log("用户密码不正确");
                registerResult.userPass = false;
                $userPass.closest('li.register_input').addClass("error");
                console.log(registerResult);
            }else{
                $userPassError.hide();
                registerResult.userPass = true;
                $userPass.closest('li.register_input').removeClass("error");
                console.log("用户密码正确");
                console.log(registerResult);
            }
        }


        function checkSMSCode(str) {
            if(str.length <4 || str == ''){
                $userSMSCodeError.show();
                console.log("验证码不正确");
                registerResult.smsCode = false;
                $smsCode.closest('li.register_input').addClass("error");
                console.log(registerResult);
            }else{
                $userSMSCodeError.hide();
                registerResult.smsCode = true;
                $smsCode.closest('li.register_input').removeClass("error");
                console.log("验证码正确");
                console.log(registerResult);
            }
        }

        $(document).on('blur','#userPass',function () {
            var userPassVal = $userPass.val();
            console.log(userPassVal);
            checkPassword(userPassVal);
            // checkRegisterBtn()
        })

        $smsCode.on('blur',function () {
            var smsCodeVal = $smsCode.val();
            checkSMSCode(smsCodeVal);
        });


        $(document).on('click','#getSMSCodeBtn',function () {
            if($userPhone.val() !== ''){
                var phoneNum = $("#userPhone").val();
                console.log(phoneNum);
                $.ajax({
                    url:BASE_URL+USER_SITE_URL.SEND_DYNAMIC_CODE.URL,
                    type:USER_SITE_URL.SEND_DYNAMIC_CODE.METHOD,
                    dataType:USER_SITE_URL.DATATYPE,
                    async:false,
                    data: {userPhone: phoneNum,codeFlag:"1"},
                    success:function (data) {
                        if (data.authStatus == "200"){
                            $.toast(data.authMsg);
                        }else{
                            $.toast(data.authMsg);
                        }
                        getSMSTimer();
                    }
                })
            }else{
                $.toast("请填写您的手机号！",2000);
            }

        });


        function getSMSTimer() {
            var smsCodeBtn = '';
            var SETTIMESECOND = 60;
            var nums = SETTIMESECOND;
            $("#getSMSCodeBtn").css($getSMSCodeBtn_FAILED);
            //将按钮置为 不可点击
            $("#getSMSCodeBtn").attr("disabled",true);
            $("#getSMSCodeBtn").text(nums+' s');
            smsCodeBtn = setInterval(function(){
                nums--;
                if(nums > 0){
                    $("#getSMSCodeBtn").text(nums+' s');
                }else{
                    clearInterval(smsCodeBtn); //清除js定时器
                    //将按钮置为 可点击
                    $("#getSMSCodeBtn").css($getSMSCodeBtn_SUCCESS);
                    $("#getSMSCodeBtn").attr("disabled",false);
                    $("#getSMSCodeBtn").text('获取验证码');
                    nums = SETTIMESECOND; //重置时间
                }
            }, 1000); //一秒执行一次
        }
    });

    // registerPage
    require.async('handlebars',function(){
        var data = genData;
        var tpl = require('/zqVue/shopwap-front/www/layout/my/register.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#registerPage").html(html);
    });




});
