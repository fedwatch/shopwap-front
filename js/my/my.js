/**
 * Created by Administrator on 2017/3/10.
 */
define(function(require,exports,module){
    require('jquery');
    // require("swiper");
    require("store");
    require("siteUrl");
    require("/js/utils/getCurrentPage");

    $(function () {
        getCurrentPage();
        // //底部菜单切换
        // $(".foot-con a").on("click", function () {
        //     $(".foot-con a").each(function () {
        //         var $this = $(this);
        //         var cla = $this.find('i').attr('class');
        //         cla = cla.replace(/2/, '');
        //         $this.find('i').attr('class', cla);
        //     });
        //     var $this = $(this);
        //     var cname = $this.find('i').attr('class');
        //     cname = cname.replace(/2/, '');
        //     $this.find('i').attr('class', cname + 2);
        //     $this.addClass('active').siblings().removeClass('active');
        // });

        // var bannerSwiper = new Swiper('.swiper-banner', {
        //     pagination: '.pagination',
        //     loop: true,
        //     grabCursor: true,
        //     paginationClickable: true,
        //     autoplay: 3000,
        //     autoplayDisableOnInteraction: false,
        //     speed: 600
        // });

        $(document).on('click','.logoutButton',function () {
            $.ajax({
                url:BASE_URL+USER_SITE_URL.USER_LOGOUT.URL,
                type:USER_SITE_URL.USER_LOGOUT.METHOD,
                dataType:USER_SITE_URL.DATATYPE,
                cache:false,
                async:false,
                data: {
                    userId: store.get('userId')
                },
                success:function (data) {
                    if(data.authStatus == '200'){
                        $.toast(data.authMsg,2000)
                    }
                }
            });
        })

    });




    // my_header
    require.async('handlebars',function(){
        var data = {
            data:'7795'
        };
        //未登陆
        var tpl = require('/layout/my/common/header.tpl');
        //登陆
        // var tpl = require('/layout/my/common/myHeader.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#my_header").html(html);
    });

    //
    // // category
    // require.async('handlebars',function(){
    //     var data = {
    //         data:'7795'
    //     };
    //     var tpl = require('/layout/index/category.tpl');
    //     var template = Handlebars.compile(tpl);
    //     var html = template(data);
    //     $("#category").html(html);
    // });

    // userColumn
    require.async('handlebars',function(){
        var data = {
            data:'7795'
        };
        var tpl = require('/layout/my/userColumn.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#userColumn").html(html);
    });


    // footer
    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/layout/index/footer.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#footer").html(html);
    });

    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/layout/common/footerBar.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#footer").html(html);
    });



});
