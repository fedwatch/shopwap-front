/**
 * 我的订单
 * Created by Administrator on 2017/3/21.
 */
define(function(require,exports,module){
    require('jquery');
    require('swiper');
    require('light7');
    require('mockjs');

    var genData = [
            {storeName:'苏菲专卖店',
                tradeStatus:'交易成功',
                thumbnail:'/assets/images/cart-item-image-product.png',title:'耐克 AIR JORDAN 6 RETRO 复刻男子运动鞋',desc:'颜色分类：一二三四五六七八九十一二三四五六七八九十',nowPrice:1399.00,pastPrice:1399.00,quant:1,totalQuant:1,totalPrice:1399,
                userChooseCol:[
                {},
                {},
                {}
                ]
            },
            {},
            {},
            {},
            {},
            {},
    ];

    $(function () {
        $($(".ocItem")[0]).addClass("active");
        $(document).on("click",".ocItem",function (e) {
            var $this = $(this);
            $(".ocItem").removeClass("active");
            $this.addClass("active");
        })



    });

    getAllOrders();
    function getAllOrders(){
        $.ajax({
            url:"/orders/getAllOrders",
            type:"post",
            dataType:"json",
            cache:false,
            data:{},
            success:function (data) {

            }
        })
    }
    getUnpaidOrders();
    function getUnpaidOrders() {
        $.ajax({
            url:"/orders/getUnpaidOrders",
            type:"post",
            dataType:"json",
            cache:false,
            data:{},
            success:function (data) {

            }
        })
    }

    getUnprocessedOrders();
    function getUnprocessedOrders(){
        $.ajax({
            url:"/orders/getUnprocessedOrders",
            type:"post",
            dataType:"json",
            cache:false,
            data:{},
            success:function (data) {

            }
        })
    }

    getDeliveryWaiting();
    function getDeliveryWaiting() {
        $.ajax({
            url:"/orders/getDeliveryWaiting",
            type:"post",
            dataType:"json",
            cache:false,
            data:{},
            success:function (data) {

            }
        })
    }

    getPendingReviews();
    function getPendingReviews() {
        $.ajax({
            url:"/orders/getPendingReviews",
            type:"post",
            dataType:"json",
            cache:false,
            data:{},
            success:function (data) {

            }
        })
    }


    // modifySuccess
    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/layout/my/myOrder.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#myOrderPage").html(html);
    });



});
