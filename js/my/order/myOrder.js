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

    var reieverStatus;
    var username = store.get("username");
    $(function () {
        // 我的订单 全部 待付款 待发货 待收货 待评价
        $(document).on("click",".ocItem",function () {
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

        // 确认收货
        $(document).on('click','.confirmReceiptBtn ',function(){
            var $this = $(this);
            console.log($this)
            var sn = $this.data('sn');

            orderComplete(username,[sn]);

            if(store.get("reieverStatus") == true){
                $this.text("已收货")
            }else{
                $this.text("确认收货")
            }


            // var text=$(".confirmReceiptBtn").text();
            // if(text!="已收货"){
            //     $.alert("确认收货","",function(){
            //         $(".confirmReceiptBtn").text("已收货");
            //     });
            // }else{
            //     $.alert("已收货","",function(){
            //     });
            // }
        });

        // 查看物流
        $(document).on("click",".checkLogBtn",function (e) {
            var $this = $(this);
            store.set("sn",$this.data("sn"));
            return location.href = '/m/html/user/logistics.html';

        });

        // 立即付款
        $(document).on("click",".paymentBtn",function () {
            var $this = $(this);

            createPayment(username,[$this.data("sn")]);

            return location.href = '/m/html/payment/alipay/commonPay.html';
        });

        // 立即评价
        $(document).on('click',".commentBtn",function () {

        });

    });



    function createPayment(username,sn){
        $.ajax({
            url:BASE_URL+ORDER_SITE_URL.CREATE_PAYMENT.URL,
            type:ORDER_SITE_URL.CREATE_PAYMENT.METHOD,
            dataType:ORDER_SITE_URL.DATATYPE,
            data:{
                username:username,
                sn :sn,
            },
            success:function (data) {
                store.set("mergeSn",data.mergeSn);
            }
        })
    }

    // /**
    //  * 支付界面合并支付
    //  * @param username
    //  * @param mergeSn
    //  */
    // function payment(username,mergeSn){
    //     $.ajax({
    //         url:BASE_URL+ORDER_SITE_URL.PAY_MENT.URL,
    //         type:ORDER_SITE_URL.PAY_MENT.METHOD,
    //         dataType:ORDER_SITE_URL.DATATYPE,
    //         data:{
    //             username:username,
    //             mergeSn  :mergeSn ,
    //         },
    //         success:function (data) {
    //
    //         }
    //     })
    // }

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
                        var tpl = require('/m/layout/my/orderData.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#getListOrders").html(html);
                    });
                });
            }
        })
    }

    /**
     *
     * @param username
     * @param sn
     */
    function orderComplete(username,sn){
        $.ajax({
            url:BASE_URL+ORDER_SITE_URL.COMPLETE.URL,
            type:ORDER_SITE_URL.COMPLETE.METHOD,
            dataType:ORDER_SITE_URL.DATATYPE,
            data:{
                username:username,
                sn :sn
            },
            success:function (data) {
                if(data.authStatus == '200'){
                    store.set("reieverStatus",true);
                    $.toast(data.authMsg);
                }else{
                    store.set("reieverStatus",false);
                    $.toast(data.authMsg)
                }

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
                        var tpl = require('/m/layout/my/myOrder.tpl');
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


