/**
 * Created by Administrator on 2017/3/13.
 */
define(function (require, exports, module) {
    require('jquery');
    require('swiper');
    require('siteUrl');
    require('light7');
    require('store');
    require('user');

    jQuery.support.cors = true;
    $(function () {
        var username = store.get("username");
        var itemIds = store.get("cartItemId");
        var snArr = store.get("snArr");
         // console.log(itemIds);
        // itemIds = itemIds.split("[").toString().split("]").toString().split(",").slice(1);
        // var clen= itemIds.length;
        // itemIds = itemIds.splice(clen-1,1);
        orderInfo(username, itemIds);
        $(document).on("click", ".detailOrderBtn", function () {
            createPayment(username, snArr);
            return window.location.href = "/html/payment/alipay/commonPay.html";
        });


    });

    /**
     * 计算应付金额,生成预订单
     * @param username
     * @param receiverId
     * @param itemIds
     */
    function calculate(username, receiverId, itemIds) {

        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.CALCULATE.URL,
            type: ORDER_SITE_URL.CALCULATE.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                receiverId: receiverId,
                itemIds: itemIds,
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    /**
     *  订单取消
     * @param username
     * @param sn    订单编号
     */
    function cancel(username, sn) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.CANCEL.URL,
            type: ORDER_SITE_URL.CANCEL.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                sn: sn,
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    /**
     * 订单完成
     * @param username
     * @param sn
     */
    function complete(username, sn) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.COMPLETE.URL,
            type: ORDER_SITE_URL.COMPLETE.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                sn: sn,
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    /**
     * 创建订单
     * @param username
     * @param cartItemId
     * @param receiverId
     * @param memo
     */
    function create(username, cartItemId, receiverId, memo) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.CREATE.URL,
            type: ORDER_SITE_URL.CREATE.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                cartItemId: cartItemId,
                receiverId: receiverId,
                memo: memo
            },
            success: function (data) {
                if (data.authStatus == "200") {
                    //存储sn
                    var snArr = [];
                    store.set("snArr", data.snList);
                    /* createPayment(username,snArr);
                     window.location.href="/html/payment/alipay/commonPay.html";*/
                }

            }
        });
    }

    /**
     * 创建支付合并
     * @param username
     * @param snArr
     */
    function createPayment(username, snArr) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.CREATE_PAYMENT.URL,
            type: ORDER_SITE_URL.CREATE_PAYMENT.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                sn: snArr
            },
            success: function (data) {
                if (data.authStatus == "200") {
                    var mergeSn = data.mergeSn;
                    store.set("mergeSn", mergeSn);
                }

            }
        });
    }

    /**
     * 删除订单
     * @param username
     * @param sn
     */
    function deleteOrder(username, sn) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.DELETE_ORDER.URL,
            type: ORDER_SITE_URL.DELETE_ORDER.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                sn: sn
            },
            success: function (data) {
                console.log(data);
            }
        });
    }


    /**
     * 生成预订单
     * @param username
     * @param itemIds
     */
    function orderInfo(username, itemIds) {

        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.INFO.URL,
            type: ORDER_SITE_URL.INFO.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                itemIds: itemIds
            },
            success: function (data) {
                if (data.authStatus == "200") {

                    //orderHeader
                    require.async('handlebars', function () {
                        var tpl = require('/layout/order/orderHeader.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#orderHeader").html(html);
                    });

                    //orderAddress
                    require.async('handlebars', function () {
                        var tpl = require('/layout/order/orderAddress.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#orderAddress").html(html);
                    });
                    //orderDetail
                    require.async('handlebars', function () {
                        var tpl = require('/layout/order/orderDetail.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#orderDetail").html(html);
                        var $amountPayable = data.orders;
                        $amountPayable.map(function (item, index) {
                            var ss = item.amountPayable;
                            var ars = ss.toString().split(".");
                            $(".int-part").eq(index).text(ars[0]);
                            $(".small-part").eq(index).text(ars[1]);
                        })

                    });

                    //orderBottomBar
                    require.async('handlebars', function () {
                        var tpl = require('/layout/order/orderBottomBar.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#orderBottomBar").html(html);
                    });
                    //用户留言
                    var $memo = data.orders;
                    var memoArr = [];
                    $memo.map(function (item, index) {
                        var $memo = item.memo;
                        memoArr.push($memo);
                    });
                    // create(username, itemIds, data.receiver.id, memoArr[0]);

                    store.set("receiverId", data.receiver.id);
                    store.set("memoArr", memoArr);


                }

            }
        });
    }

    /**
     *
     * @param username
     * @param orderStatus
     * @param pageNumber
     */
    function orderList(username, orderStatus, pageNumber) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.LIST.URL,
            type: ORDER_SITE_URL.LIST.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                orderStatus: orderStatus,
                pageNumber: pageNumber
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    /**
     * 查看物流
     * @param username
     * @param sn
     */
    function orderLogistics(username, sn) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.LOGISTICS.URL,
            type: ORDER_SITE_URL.LOGISTICS.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                sn: sn
            },
            success: function (data) {
                console.log(data);
            }
        });
    }


    /**
     * 查看订单
     * @param username
     * @param sn
     */
    function orderView(username, sn) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.VIEW.URL,
            type: ORDER_SITE_URL.VIEW.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                sn: sn
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    /**
     * 保存收货地址
     * @param username
     * @param consignee
     * @param areaId
     * @param address
     * @param zipCode
     * @param phone
     * @param isDefault
     */
    function orderSaveReceiver(username, consignee, areaId, address, zipCode, phone, isDefault) {
        $.ajax({
            url: BASE_URL + MEMBER_SITE_URL.SAVE_RECEIVER.URL,
            type: MEMBER_SITE_URL.SAVE_RECEIVER.METHOD,
            dataType: MEMBER_SITE_URL.DATATYPE,
            data: {
                username: username,
                consignee: consignee,
                areaId: areaId,
                address: address,
                zipCode: zipCode,
                phone: phone,
                isDefault: isDefault
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    /**
     * 收货地址删除
     * @param username
     * @param id
     */
    function receiverDelete(username, id) {
        $.ajax({
            url: BASE_URL + MEMBER_SITE_URL.DELETE.URL,
            type: MEMBER_SITE_URL.DELETE.METHOD,
            dataType: MEMBER_SITE_URL.DATATYPE,
            data: {
                username: username,
                id: id,
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    /**
     * 收货地址列表查看
     * @param username
     * @param pageNumber
     */
    function receiverList(username, pageNumber) {
        $.ajax({
            url: BASE_URL + MEMBER_SITE_URL.LIST.URL,
            type: MEMBER_SITE_URL.LIST.METHOD,
            dataType: MEMBER_SITE_URL.DATATYPE,
            data: {
                username: username,
                pageNumber: pageNumber,
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    /**
     * 添加新的收货地址
     * @param username
     * @param consignee
     * @param areaId
     * @param address
     * @param zipCode
     * @param phone
     * @param isDefault
     */
    function receiverSave(username, consignee, areaId, address, zipCode, phone, isDefault) {
        $.ajax({
            url: BASE_URL + MEMBER_SITE_URL.SAVE.URL,
            type: MEMBER_SITE_URL.SAVE.METHOD,
            dataType: MEMBER_SITE_URL.DATATYPE,
            data: {
                username: username,
                consignee: consignee,
                areaId: areaId,
                address: address,
                zipCode: zipCode,
                phone: phone,
                isDefault: isDefault,
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    /**
     * 收货地址列表更新
     * @param username
     * @param id
     * @param consignee
     * @param areaId
     * @param address
     * @param zipCode
     * @param phone
     * @param isDefault
     */
    function receiverUpdate(username, id, consignee, areaId, address, zipCode, phone, isDefault) {
        $.ajax({
            url: BASE_URL + MEMBER_SITE_URL.SAVE.URL,
            type: MEMBER_SITE_URL.SAVE.METHOD,
            dataType: MEMBER_SITE_URL.DATATYPE,
            data: {
                username: username,
                id: id,
                consignee: consignee,
                areaId: areaId,
                address: address,
                zipCode: zipCode,
                phone: phone,
                isDefault: isDefault,
            },
            success: function (data) {
                console.log(data);
            }
        });
    };

    /**
     * 应付金额计算
     * @param username
     */
    function amountPayables(username, receiverId, itemIds, DOM) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.CALCULATE.URL,
            type: ORDER_SITE_URL.CALCULATE.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                receiverId: receiverId,
                itemIds: itemIds,
            },
            success: function (data) {
                console.log(data);
                $(DOM).val();
            }
        });

    }


});