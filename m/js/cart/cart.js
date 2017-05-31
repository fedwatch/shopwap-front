/**
 * Created by Administrator on 2017/3/21.
 * Ein
 */
define(function (require, exports, module) {
    require('jquery');
    require('store');
    require('siteUrl');
    require('getUser');
    require('light7');

    jQuery.support.cors = true;


    var username = store.get("username");
    var userStatus = store.get("userStatus");

    cartList(username);

    /**
     * 购物车查看
     * @param username
     */
    function cartList(username) {
        $.ajax({
            url: BASE_URL + CART_SITE_URL.CART_LIST.URL,
            type: CART_SITE_URL.CART_LIST.METHOD,
            dataType: CART_SITE_URL.DATATYPE,
            data: {username: username},
            cache: true,
            async: false,
            success: function (data) {
                if (data.authStatus == "200") {
                    // cartItem
                    require.async('handlebars', function () {
                        require.async('transDetails', function () {
                            var tpl = require('/m/layout/cart/cartItem.tpl');
                            var template = Handlebars.compile(tpl);
                            var html = template(data);
                            $("#cartItem").html(html);
                        });
                    });

                } else if (data.authStatus == "500") {
                    $("#nothingBuy").show();
                }
            }
        });
    }

    /**
     * 购物车添加
     * @param username
     * @param productId
     * @param quantity
     */
    function cartAdd(username, productId, quantity) {
        $.ajax({
            url: BASE_URL + CART_SITE_URL.CART_ADD.URL,
            type: CART_SITE_URL.CART_ADD.METHOD,
            dataType: CART_SITE_URL.DATATYPE,
            data: {
                username: username,//会员名称
                productId: productId,//产品id
                quantity: quantity,//商品数量
            },
            cache: true,
            async: false,
            success: function (data) {
                console.log(data.authMsg)
            }
        });
    }

    /**
     * 购物车商品数量
     * @param username
     */
    function cartCount(username) {
        $.ajax({
            url: BASE_URL + CART_SITE_URL.CART_COUNT.URL,
            type: CART_SITE_URL.CART_COUNT.METHOD,
            dataType: CART_SITE_URL.DATATYPE,
            data: {
                username: username,//会员名称
            },
            cache: true,
            async: false,
            success: function (data) {
                console.log(data);
            }
        });
    }

    function cartEdit(username, itemId, quantity) {
        $.ajax({
            url: BASE_URL + CART_SITE_URL.CART_EDIT.URL,
            type: CART_SITE_URL.CART_EDIT.METHOD,
            dataType: CART_SITE_URL.DATATYPE,
            data: {
                username: username,//会员名称
                itemId: itemId,//购物车项id
                quantity: quantity,//商品数量
            },
            cache: true,
            async: false,
            success: function (data) {
                console.log(data);
            }
        });
    }


    function cartDelete(username, itemId) {
        $.ajax({
            url: BASE_URL + CART_SITE_URL.CART_DELETE.URL,
            type: CART_SITE_URL.CART_DELETE.METHOD,
            dataType: CART_SITE_URL.DATATYPE,
            data: {
                username: username,//会员名称
                itemId: itemId,//产品id
            },
            cache: true,
            async: false,
            success: function (data) {
                console.log(data);
            }
        });
    }

    //购物车清空
    function cartClear(username) {
        $.ajax({
            url: BASE_URL + CART_SITE_URL.CART_CLEAR.URL,
            type: CART_SITE_URL.CART_CLEAR.METHOD,
            dataType: CART_SITE_URL.DATATYPE,
            data: {
                username: username,//会员名称
            },
            cache: true,
            async: false,
            success: function (data) {
                console.log(data);
                if (data.authStatus == '200') {
                    location.reload();
                } else {
                    $.toast(data.authMsg);
                }

            }
        });
    }


    var selectedPrices = [];
    var cartItem = $(".cart-item").length;
    var pricesArr = [];//已选商品价格数组
    var quantArr = [];//已选商品数量  数组

    // 触发 编辑 事件
    $(document).on('click', ".editBtn", function (e) {
        var $this = $(this);
        var $siblingsDOM = $this.parent().siblings();
        var $parentDOM = $this.parent().parent();
        $parentDOM.find(".editBtn").hide();
        $parentDOM.find(".finishBtn").show();
        var $cartItemText = $siblingsDOM.children('div.cart-item-text');
        var $cartItemEditPanel = $siblingsDOM.children('div.cart-item-edit-panel');
        $cartItemText.hide();
        $cartItemEditPanel.show().css({display: 'inline-flex'});

        /*
         @TODO
         缺少商品数量的数据绑定 数据原子性不明显
         购物车数量不能和用户操作绑定
         */

    });

    // 购物车下单
    $(document).on("click", "#checkoutBtn", function () {
        if (userStatus) {
            var cartItemIdArray = [];
            var len = $(".cart-list-select:checked").length;
            for (var i = 0; i < len; i++) {
                cartItemIdArray.push($(".cart-list-select:checked").eq(i).data("itemid"));
            }
            store.set("cartItemId", cartItemIdArray);
            if (cartItemIdArray.length !== 0) {
                location.href = "/m/html/order/order.html";
            } else {
                $.toast("购物车没有选中商品！")
            }
        } else {
            return location.href = '/m/html/my/login/login.html';
        }
    });

    // 触发 完成 事件
    $(document).on('click', '.finishBtn', function (e) {
        // console.log('完成 已发生');
        var $this = $(this);
        var $siblingsDOM = $this.parent().siblings();
        var $parentDOM = $this.parent().parent();
        $parentDOM.find(".editBtn").show();
        $parentDOM.find(".finishBtn").hide();
        var $cartItemText = $siblingsDOM.children('div.cart-item-text');
        var $cartItemEditPanel = $siblingsDOM.children('div.cart-item-edit-panel');
        $cartItemText.show();
        $cartItemEditPanel.hide();


    });

    // 触发 删除 事件
    $(document).on('click', ".panel-remove-btn", function () {
        var $this = $(this);
        var selectedLength = $this.parent().parent().parent().find(".cart-store-img-text-label").length;

        //当前操作店铺ID
        var currentStoreId = $($this.parent().parent().parent().find(".cart-store-title-wrapper>.cart-shop-select"))[0].id;
        currentStoreId = currentStoreId.split("-")[1];

        //当前操作商品ID
        var currentProductId = $($this.parent().parent().find(".cart-item-select-wrapper > .cart-list-select"))[0].id
        currentProductId = currentProductId.split("-")[1];
        var removeItems = [];
        removeItems.push(currentProductId);

        var cartStoreId = [];
        var cartProductId = [];
        var stackVideo = "";

        cartDelete(username, removeItems);
        if (selectedLength == 1) {
            $this.parent().parent().parent().remove();
            cartItem = cartItem - 1;
            if (cartItem == -1) {
                $("#nothingBuy").show();
            }
        } else {
            $this.parent().parent().remove();
        }
    });

    //失效宝贝区
    $(document).on("click", ".unactive-cart-item", function () {
        var $this = $(this);
        $(".offEditPanel").show();
    });
    //失效宝贝区
    $(document).on("click", ".cancelOffItem", function () {
        $(".offEditPanel").hide();
    });
    //失效宝贝区
    $(document).on("click", ".removeOffItem", function (e) {
        var $parent = $(e.target).closest('div.offEditPanel').parent();
        $parent.find(".cart-off-store-img-text-label").remove();
        $(".offEditPanel").hide();
    });


    // 点击 商品选择
    $(document).on('click', ".cart-list-select", function () {
        var $this = $(this);
        var rs = $this.parent().parent().parent().find(".cart-store-title-label .cart-shop-select");
        var checkedLength = $this.parent().parent().parent().find(".cart-list-select:checked").length;
        var currentFlex = $this.parent().parent().find(".cart-item-text > .cart-item-display-flex");
        var price = parseInt(currentFlex.find(".cart-item-price-box > .sign-number ").text());//单品价格
        // console.log(price)
        var quant = parseInt(currentFlex.find(".cart-item-quantity > .quantity-ct ").text());//已购数量
        // console.log(quant)
        if ($this.attr("checked") !== "checked") {
            pricesArr.splice(pricesArr.length - 1, 1);//单品价格列表 最后端-1
            quantArr.splice(quantArr.length - 1, 1);
        } else if ($this.attr("checked") == "checked") {
            pricesArr.push(price);
            quantArr.push(quant);
        }
        if (checkedLength !== 0) {
            rs.attr("checked", true);
            $(".cart-all-select").attr("checked", true);
        } else {
            rs.attr("checked", false);
            $(".cart-all-select").attr("checked", false);

        }
        $(".text-all-select").hide();
        $(".text-selected").show();
        checkedText();
        calcResultToHTML();
    });


    $(document).on('click', '.clearAllBtn', function () {
        cartClear(username);
    });

    // 点击 店铺选择
    $(document).on('click', ".cart-shop-select", function () {
        var $this = $(this);
        var rs = $this.parent().parent().siblings().find("input.cart-list-select");
        var currentFlex = rs.parent().parent().find(".cart-item-text");
        var len = currentFlex.length;
        if (rs.attr("checked") !== "checked") {
            rs.attr("checked", true);
            for (var i = 0; i < len; i++) {
                var price = parseInt(currentFlex.eq(i).find(".cart-item-price-box > .sign-number ").text());//单品价格
                var quant = parseInt(currentFlex.eq(i).find(".cart-item-quantity > .quantity-ct ").text());//已购数量
                pricesArr.push(price);
                quantArr.push(quant);
            }
            // console.log(pricesArr)
            // console.log(quantArr)

            var rlen = rs.attr("checked", true).length;
            console.log(len);
            console.log(rlen);
            if (len == rlen && $(".cart-all-select").attr("checked", false)) {
                $(".cart-all-select").attr("checked", true);
            }
        } else {
            rs.attr("checked", false);
            for (var i = 0; i < len; i++) {
                pricesArr.splice(pricesArr.length - 1, 1);//单品价格列表 最后端-1
                quantArr.splice(quantArr.length - 1, 1);
            }

            $(".cart-all-select").attr("checked", false);
            // console.log(pricesArr)
            // console.log(quantArr)
        }
        $(".text-all-select").hide();
        $(".text-selected").show();
        checkedText();
        calcResultToHTML();
    });

    // 点击 全选
    $(document).on('click', "#cartAllSelect", function () {
        var currentFlex = $(".cart-store-img-text-label > .cart-item-text");
        var len = currentFlex.length;
        if ($(".cart-shop-select").attr("checked") !== 'checked' && $(".cart-list-select").attr("checked") !== 'checked') {
            $(".cart-shop-select").attr("checked", true);
            $(".cart-list-select").attr("checked", true);
            for (var i = 0; i < len; i++) {
                var price = parseInt(currentFlex.eq(i).find(".cart-item-price-box > .sign-number ").text());//单品价格
                var quant = parseInt(currentFlex.eq(i).find(".cart-item-quantity > .quantity-ct ").text());//已购数量
                pricesArr.push(price);
                quantArr.push(quant);
            }
        } else {
            $(".cart-shop-select").attr("checked", false);
            $(".cart-list-select").attr("checked", false);
            for (var i = 0; i < len; i++) {
                pricesArr.splice(pricesArr.length - 1, 1);//单品价格列表 最后端-1
                quantArr.splice(quantArr.length - 1, 1);
            }
        }
        console.log(pricesArr);
        console.log(quantArr);
        $(".text-all-select").hide();
        $(".text-selected").show();
        checkedText();
        calcResultToHTML();
    });

    // 数量添加
    $(document).on('click', ".panelAddBtn", function () {
        var $this = $(this);
        var number = $this.parent().find('input.panel-text-input').val() || 0;
        number = parseInt(number) + 1;
        $this.parent().find('input.panel-text-input').val(number);
        var quantity = $this.parents(".cart-store-img-text-label").find(".cart-item-text > .cart-item-display-flex > .cart-item-quantity > .quantity-ct");
        var itemId = $this.parents(".cart-store-img-text-label").find(".cart-item-select-wrapper>.cart-list-select").data("itemid");
        var quant = $this.parents(".cart-store-img-text-label").find(".cart-item-text > .cart-item-display-flex > .cart-item-quantity > .quantity-ct").text()
        quant = parseInt(quant) + 1
        cartEdit(username, itemId, quant);
        quantity.text(number);
    });

    // 数量减少
    $(document).on('click', ".panelMinusBtn", function () {
        var $this = $(this);
        var number = $this.parent().find('input.panel-text-input').val() || 0;
        number = parseInt(number) - 1;
        if (number == 0) {
            number = 1;
        }
        $this.parent().find('input.panel-text-input').val(number);
        var quantity = $this.parents(".cart-store-img-text-label").find(".cart-item-text > .cart-item-display-flex > .cart-item-quantity > .quantity-ct");
        var itemId = $this.parents(".cart-store-img-text-label").find(".cart-item-select-wrapper>.cart-list-select").data("itemid");
        var quant = $this.parents(".cart-store-img-text-label").find(".cart-item-text > .cart-item-display-flex > .cart-item-quantity > .quantity-ct").text()
        quant = parseInt(quant) - 1;
        cartEdit(username, itemId, quant);
        quantity.text(number)
    });

    $(document).on('blur', '.panel-text-input', function () {
        var $this = $(this);
        var quant = $this.val();
        var quantity = $this.parents(".cart-store-img-text-label").find(".cart-item-text > .cart-item-display-flex > .cart-item-quantity > .quantity-ct");
        var itemId = $this.parents(".cart-store-img-text-label").find(".cart-item-select-wrapper>.cart-list-select").data("itemid");
        quant = parseInt(quant);
        cartEdit(username, itemId, quant);
        quantity.text(quant)
    })

    //已选中数量
    function checkedText() {
        var checkedLength = $(".cart-list-select:checked").length;
        $(".text-select-number").text(checkedLength);
    }

    //商品计算后的结果给到HTML
    function calcResultToHTML() {
        var total = calcCart();
        $(".totalGoodsPrices > .sign-number").text(total);
    }

    //计算已选择商品总价
    function calcCart() {
        var totalPrice = 0;
        for (var i = 0, j = 0; i < pricesArr.length, j < quantArr.length; i++, j++) {
            totalPrice += parseFloat(pricesArr[i]) * parseFloat(quantArr[j]);
        }
        totalPrice = totalPrice.toFixed(2);
        // console.log(totalPrice);
        return totalPrice;
    }


    // my_header
    require.async('handlebars', function () {
        var storeData = {
            data: '7795'
        };
        var tpl = require('/m/layout/cart/cart.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(storeData);
        $("#cartPage").html(html);
    });

    // cartHeader
    require.async('handlebars', function () {
        var storeData = {
            headerTitle: '购物车'
        };
        var tpl = require('/m/layout/cart/cartHeader.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(storeData);
        $("#cartHeader").html(html);
    });


    // cartFooter
    require.async('handlebars', function () {
        var storeData = {};
        var tpl = require('/m/layout/cart/cartFooter.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(storeData);
        $("#cartFooter").html(html);
    });

    // cartIndex
    require.async('handlebars', function () {
        var storeData = {};
        var tpl = require('/m/layout/common/cartIndex.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(storeData);
        $("#cartIndex").html(html);
    });

    // nothingBuy
    require.async('handlebars', function () {
        var storeData = {};
        var tpl = require('/m/layout/cart/nothingBuy.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(storeData);
        $("#nothingBuy").html(html);
    });

});
