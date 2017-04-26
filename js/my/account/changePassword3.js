define(function(require,exports,module){
    require('jquery');
    require("light7");
    $(function(){
        var $userPassword=$("#userPassword");
        var $sureUserPassword=$("#userPasswordT");

        //寻找除当前input元素之外的其他input元素
        function selectInput(elem,tag,flag){
            if(flag==true){
                elem.parents(tag).nextAll().find("input").attr("disabled",true);
            }else{
                elem.parents(tag).nextAll().find("input").removeAttr("disabled");
            }
        }

        function checkPassword(str){
            var strong=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
            var middle=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
            var weak=/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;
            var flag=true;
            if(str.length <6 || str=="" ||str.length >16 ){
                $.toast("请输入6到16位字符串");
                flag=true;
                selectInput($userPassword,"li",flag);
            }else{
                if(strong.test(str)){
                    $.toast("密码强度强");
                }
                if(middle.test(str)){
                    $.toast("密码强度中等");
                }
                if(weak.test(str)){
                    $.toast("密码强度弱");
                }
                flag=false;
                selectInput($userPassword,"li",flag);
            }
        }
        function surePassword(str){
            var flag=true;
            if(!($userPassword.val()===$sureUserPassword.val())){
                $.toast("两次密码不同");
                flag=false;
            }else{
                flag=true;
            }
            return flag;
        }
        $userPassword.on("blur",function(){

            var $userPasswordVal=$userPassword.val();
            checkPassword($userPasswordVal);
        });
        $(".button-password").find(".button-big").click(function(){
            var $sureUserPasswordVal=$sureUserPassword.val();
            var flg=surePassword($sureUserPasswordVal);
            if(flg==true){
                window.location.href="./changePassword3.html";
            }else{
                return;
            }
        });

    });
    require.async('handlebars',function(){
        var data={};
        var tpl=require('/layout/my/account/changePassword3.tpl');
        var template=Handlebars.compile(tpl);
        var html=template(data);
        $("#changePasswordPage3").html(html);
    });
})
