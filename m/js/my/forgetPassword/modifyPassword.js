/**
 * Created by Administrator on 2017/3/20.
 */
define(function(require,exports,module){
    require('jquery');
    require('swiper');
    require('light7');
    require('store');
    require('siteUrl');


    jQuery.support.cors = true;
    $(function () {

        var $userPassword1 = $("#userPassword1");//登录密码1
        var $userPassword2 = $("#userPassword2");//登录密码2
        var userPassword1Error = $("#userPassword1Error");//登录密码错误提示信息
        var userPassword2Error = $("#userPassword2Error");//手机号错误提示信息
        var userPassword3Error = $("#userPassword3Error");//手机号错误提示信息
        var $registerBtn = $('#registerBtn');//立即注册按钮
        var registerResult = {};//内部数据的状态集

        var confirmPass;
        var username = store.get("username");

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



        function checkPassword() {
            // debugger;
            var up1 = $userPassword1.val();
            var up2 = $userPassword2.val();

            if (up1.length < 8 || up2.length < 8){
                $.toast("正确密码长度为8到16位",2000);
                return;
            }

            if(up1 == up2
                && up1 !== ''
                && up2 !== ''
                && up1.length >= 8
                && up1.length <= 16
                && up2.length >= 8
                && up2.length <= 16
            ){
                $userPassword1.closest('li.register_input').removeClass('error');
                $userPassword2.closest('li.register_input').removeClass('error');
                registerResult.passable = true;
                console.log('passable true')
            }else{
                $userPassword1.closest('li.register_input').addClass('error');
                $userPassword2.closest('li.register_input').addClass('error');
                registerResult.passable = false;
                console.log('passable false')
            }
            if(registerResult.passable && up1 == up2){
                confirmPass = up1;
            }
            return registerResult;
        }


        $(document).on('click','#registerBtn',function () {

            checkPassword();
            if( registerResult.passable == true){
                $registerBtn.addClass('button-success').css($registerBtn_SUCCESS);
                console.log('http:// register success result')

                resetPassword(username ,confirmPass )
            }else{
                $registerBtn.removeClass('button-success').css($registerBtn_FAILED);
                console.log('http:// register failed result')
            }
        })


        function resetPassword(username ,newPwd ) {
            $.ajax({
                url:BASE_URL+USER_SITE_URL.RESET_PASSWORD.URL,
                type:USER_SITE_URL.RESET_PASSWORD.METHOD,
                dataType:USER_SITE_URL.DATATYPE,
                data: {
                    username : username,
                    newPwd : newPwd
                },
                cache:true,
                async:false,
                success:function (data) {
                    if(data.authStatus == '200'){
                        $.toast(data.authMsg);
                        return location.href="/m/html/my/forgetPassword/modifySuccess.html"
                    }else{
                        $.toast(data.authMsg);
                    }
                }
            });
        }
    });

    // registerPage
    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/m/layout/my/forgetPassword/modifyPassword.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#modifyPasswordPage").html(html);
    });




});
