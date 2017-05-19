/**
 * 我的订单
 * Created by Administrator on 2017/3/21.
 */
define(function(require,exports,module){
    require('jquery');
    require('swiper');
    require('light7');
    // require('mockjs');
    require('siteUrl');
    require('store');

    var genData = [
        {
            storeName: '苏菲专卖店',
            tradeStatus: '交易成功',
            thumbnail: '/assets/images/cart-item-image-product.png',
            title: '耐克 AIR JORDAN 6 RETRO 复刻男子运动鞋',
            desc: '颜色分类：一二三四五六七八九十一二三四五六七八九十',
            nowPrice: 1399.00,
            pastPrice: 1399.00,
            quant: 1,
            totalQuant: 1,
            totalPrice: 1399,
            userChooseCol: [
                {},
                {},
                {}
            ]
        },
    ];

    jQuery.support.cors = true;
    $(function () {
        var username = store.get("username");
        getListOrders(username,'all','1');
        $($(".ocItem")[0]).addClass("active");

        $(document).on("click",".ocItem",function (e) {
            var $this = $(this);
            $(".ocItem").removeClass("active");
            $this.addClass("active");
            if($this.hasClass('all')){
                getListOrders(username,'all','1');
            }else if($this.hasClass('unconfirmed')){
                getListOrders(username,'unconfirmed','1');
            }else if($this.hasClass('confirmed')){
                getListOrders(username,'confirmed','1');
            }
            else if($this.hasClass('shipped')){
                getListOrders(username,'shipped','1');
            }
            else if($this.hasClass('completed')){
                getListOrders(username,'completed','1');
            }

        });

        $(".confirmReceiptBtn").click(function(){
            var text=$(".confirmReceiptBtn").text();
            if(text!="已收货"){
                $.alert("确认收货","",function(){
                    $(".confirmReceiptBtn").text("已收货");
                });
            }else{
                $.alert("已收货","",function(){
                    console.log("收获成功");
                });
            }
        });

    });



    /*
     订单状态:
     全部:all
     待付款:unconfirmed
     待发货:confirmed
     待收货:shipped
     待评价:completed
     */
    function getListOrders(username,orderStatus,pageNumber){
        $.ajax({
            url:BASE_URL+ORDER_SITE_URL.LIST.URL,
            type:ORDER_SITE_URL.LIST.METHOD,
            dataType:ORDER_SITE_URL.DATATYPE,
            data:{
                username:username,
                orderStatus :orderStatus,
                pageNumber :pageNumber
            },
            success:function (data) {
                require.async('handlebars',function(){
                    var tpl = require('/layout/my/myOrder.tpl');
                    var template = Handlebars.compile(tpl);
                    var html = template(data);
                    $("#myOrderPage").html(html);
                });
            }
        })
    }



    // modifySuccess


});


