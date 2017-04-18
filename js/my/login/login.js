/**
 * Created by Administrator on 2017/3/10.
 */
define(function (require, exports, module) {
    require('jquery');
    require('swiper');

    $(function () {
        var $userPhone = $('#userPhone');
        var $userPass = $('#userPass');
        var $loginBtn = $('#loginBtn');
        var resultState = {};
        var regex = /^1\d{10}$/;
        if ($userPhone !== '' && regex.test($userPhone) == true) {
            return resultState.phoneable = true;
        } else {
            return resultState.phoneable = false;
        }

        if ($userPass !== '' && $userPass.length >= 8 && $userPass.length <= 16) {
            return resultState.passable = true;
        } else {
            return resultState.passable = false;
        }


        $loginBtn.on('click', function () {
            console.log("click login btn")
            if (resultState.passable == true && resultState.phoneable == true) {
                location.href = '/html/my/my.html';
            }else{
                console.log("login failed so you need change something.");
            }
        })


    });

    // loginPage
    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/layout/my/login.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#loginPage").html(html);
    });

});
