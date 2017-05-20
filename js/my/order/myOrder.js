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

    jQuery.support.cors = true;
    var username = store.get("username");
    $(function () {
        // 我的订单 全部 待付款 待发货 待收货 待评价
        $(document).on("click",".ocItem",function (e) {
            var $this = $(this);
            $(".ocItem").removeClass("active");

            var all = $this.hasClass('all');
            var unconfirmed = $this.hasClass('unconfirmed');
            var confirmed = $this.hasClass('confirmed');
            var shipped = $this.hasClass('shipped');
            var completed = $this.hasClass('completed');


            if($this.hasClass('all')){
                getListOrders(username,'all','1');
            }else if($this.hasClass('unconfirmed')){
                getListOrders(username,'unconfirmed','1');
            }else if($this.hasClass('confirmed')){
                getListOrders(username,'confirmed','1');
            } else if($this.hasClass('shipped')){
                getListOrders(username,'shipped','1');
            } else if($this.hasClass('completed')){
                getListOrders(username,'completed','1');
            }

            if(all){
                $(".ocItem.all").addClass("active");
            }else if (unconfirmed){
                $(".ocItem.unconfirmed").addClass("active");
            }else if (confirmed){
                $(".ocItem.confirmed").addClass("active");
            }else if (shipped){
                $(".ocItem.shipped").addClass("active");
            }else if (completed){
                $(".ocItem.completed").addClass("active");
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

        $(document).on("click",".checkLogBtn",function (e) {
            var $this = $(this);
            store.set("sn",$this.data("sn"));
            return location.href = '/html/user/logistics.html';

        });

    });



    /*

     */

    /**
     * 获取对应状态的订单
     * @param username
     * @param orderStatus   订单状态
     *
         全部:all
         待付款:unconfirmed
         待发货:confirmed
         待收货:shipped
         待评价:completed
     * @param pageNumber
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
                    require.async('transMyOrder',function(){
                        var tpl = require('/layout/my/orderData.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#getListOrders").html(html);
                    });
                });
            }
        })
    }



    // modifySuccess
    require.async('handlebars',function(){
        $.ajax({
            url:BASE_URL+ORDER_SITE_URL.LIST.URL,
            type:ORDER_SITE_URL.LIST.METHOD,
            dataType:ORDER_SITE_URL.DATATYPE,
            data:{
                username:username,
                orderStatus :'all',
                pageNumber :'1'
            },
            success:function (data) {
                require.async('handlebars',function(){
                    require.async('transMyOrder',function(){
                        var tpl = require('/layout/my/myOrder.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#myOrderPage").html(html);
                        $($(".ocItem")[0]).addClass("active");
                    });
                });
            }
        })
    })


});


