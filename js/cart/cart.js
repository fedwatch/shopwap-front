/**
 * Created by Administrator on 2017/3/21.
 * Ein
 */
define(function (require, exports, module) {
    require('jquery');
    require('mockjs');
    require('store');
    require('siteUrl');
    require('user');

    Mock.mock(/\/cart\/getCartData$/, {
        "stateCode": "200",
        "productUrl": [
            "http://localhost:8080/html/detail/detail.html",
            "http://localhost:8080/html/detail/detail.html",
            "http://localhost:8080/html/detail/detail.html",
            "http://localhost:8080/html/detail/detail.html",
            "http://localhost:8080/html/detail/detail.html",
        ],
        "thumbnail": [
            {"url": "//img.alicdn.com/bao/uploaded/i3/1136619306/TB2g9ZQnpXXXXcbXXXXXXXXXXXX_!!1136619306.jpg_sum.jpg"},
            {"url": "//img.alicdn.com/bao/uploaded/i4/2128581861/TB2pNB8lItnpuFjSZFvXXbcTpXa_!!2128581861.jpg_sum.jpg"},
            {"url": "//img.alicdn.com/bao/uploaded/i1/791105148/TB2bkmfj0RopuFjSZFtXXcanpXa_!!791105148.jpg_sum.jpg"},
            {"url": "//img.alicdn.com/bao/uploaded/i3/791105148/TB2GbwYb5C9MuFjSZFoXXbUzFXa_!!791105148.jpg_sum.jpg"},
            {"url": "//img.alicdn.com/bao/uploaded/i3/791105148/TB2GbwYb5C9MuFjSZFoXXbUzFXa_!!791105148.jpg_sum.jpg"},
        ],
        "productName": [
            "LG趣拍得 POPO相机 手机便携相片打印机",
            "四核游戏台式机DIY网吧组装电脑主机LOL",
            "四核游戏台式机DIY网吧组装电脑主机LOL",
            "四核游戏台式机DIY网吧组装电脑主机LOL",
            "i7级独显GTX750Ti2G/8G内存台式机秒守望先锋剑灵电脑主机组装机"
        ],
        "productId": [
            "5217781",
            "1217782",
            "4217786",
            "9217871",
            "2217781"
        ],
        "storeId": [
            "289737"
        ],
        "storeName": "ASUS专卖店",
        "productPrice": [
            "135.00",
            "296.00",
            "175.00",
            "99.00",
            "65.00",
        ],
        "shippingCost": ["0", "0", "0", "0", "0"],
        "productDescription": [
            "A productDescription",
            "B productDescription",
            "C productDescription",
            "D productDescription",
            "E productDescription",
        ],
        "quant": ["1", "2", "4", "1", "1"],
        "productState": ["true", "true", "true", "true", "false"],
    });

    $(function () {
        getCartFromLS();
        cartList();
        cartAdd();
        cartCount();
        cartEdit();
        cartDelete();
        cartClear();

        function getCartFromLS() {
            var cartData = store.get("cartData");
            if(typeof cartData == "undefined"){
                $("#nothingBuy").show();
            }
        }
        //购物车查看
        function cartList(){
            var username = store.get("username");
            $.ajax({
                url:BASE_URL+CART_SITE_URL.CART_LIST.URL,
                type:CART_SITE_URL.CART_LIST.METHOD,
                dataType:CART_SITE_URL.DATATYPE,
                data:{username:username},
                success:function (data) {
                    console.log(data);
                }
            });
        }
        //购物车添加
        function cartAdd(){
            var username = 'jiangwangui';
            var productId = [];
            var quantity = 18;

            $.ajax({
                url:BASE_URL+CART_SITE_URL.CART_ADD.URL,
                type:CART_SITE_URL.CART_ADD.METHOD,
                dataType:CART_SITE_URL.DATATYPE,
                data:{
                    username  :username ,//会员名称
                    productId   :productId ,//产品id
                    quantity   :quantity ,//商品数量
                },
                success:function (data) {
                    console.log(data);
                }
            });
        }
        //
        function cartCount(){
            var username = 'jiangwangui';
            $.ajax({
                url:BASE_URL+CART_SITE_URL.CART_COUNT.URL,
                type:CART_SITE_URL.CART_COUNT.METHOD,
                dataType:CART_SITE_URL.DATATYPE,
                data:{
                    username  :username ,//会员名称
                },
                success:function (data) {
                    console.log(data);
                }
            });
        }

        function cartEdit(){
            var username = 'jiangwangui';
            var itemId = [];
            var quantity = 18;

            $.ajax({
                url:BASE_URL+CART_SITE_URL.CART_EDIT.URL,
                type:CART_SITE_URL.CART_EDIT.METHOD,
                dataType:CART_SITE_URL.DATATYPE,
                data:{
                    username :username,//会员名称
                    itemId :itemId,//购物车项id
                    quantity  :quantity ,//商品数量
                },
                success:function (data) {
                    console.log(data);
                }
            });
        }

        function cartDelete(){
            var username = 'jiangwangui';
            var productId = [];
            $.ajax({
                url:BASE_URL+CART_SITE_URL.CART_DELETE.URL,
                type:CART_SITE_URL.CART_DELETE.METHOD,
                dataType:CART_SITE_URL.DATATYPE,
                data:{
                    username  :username ,//会员名称
                    productId   :productId ,//产品id
                },
                success:function (data) {
                    console.log(data);
                }
            });
        }
        //购物车清空
        function cartClear(){
            var username = 'jiangwangui';

            $.ajax({
                url:BASE_URL+CART_SITE_URL.CART_CLEAR.URL,
                type:CART_SITE_URL.CART_CLEAR.METHOD,
                dataType:CART_SITE_URL.DATATYPE,
                data:{
                    username  :username ,//会员名称
                },
                success:function (data) {
                    console.log(data);
                }
            });
        }



        var selectedPrices = [];
        var cartItem = $(".cart-item").length;
        var pricesArr = [];
        var quantArr = [];

        // 触发 编辑 事件
        $(".editBtn").on('click', function (e) {
            var $this = $(this);
            var $siblingsDOM = $this.parent().siblings();
            var $parentDOM = $this.parent().parent();
            $parentDOM.find(".editBtn").hide();
            $parentDOM.find(".finishBtn").show();
            var $cartItemText = $siblingsDOM.children('div.cart-item-text');
            var $cartItemEditPanel = $siblingsDOM.children('div.cart-item-edit-panel');
            $cartItemText.hide();
            $cartItemEditPanel.show().css({display: 'inline-flex'});

        });

        $(document).on("click", "#checkoutBtn", function () {
            location.href = "/html/payment/payment.html"
        })

        // 触发 完成 事件
        $(".finishBtn").on('click', function (e) {
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
        $(".panel-remove-btn").on('click', function () {
            var $this = $(this);
            var selectedLength = $this.parent().parent().parent().find(".cart-store-img-text-label").length;

            //当前操作店铺ID
            var currentStoreId = $($this.parent().parent().parent().find(".cart-store-title-wrapper>.cart-shop-select"))[0].id;
            currentStoreId = currentStoreId.split("-")[1];

            //当前操作商品ID
            var currentProductId = $($this.parent().parent().find(".cart-item-select-wrapper > .cart-list-select"))[0].id
            currentProductId = currentProductId.split("-")[1];

            var cartStoreId = [];
            var cartProductId = [];

            var sItem = store.get("cartData").item;//店铺
            var sItemLen = sItem.length;

            for(var i = 0; i < sItemLen;i++){
                    cartStoreId.push(sItem[i].storeId);//购物车店铺ID
            }

            var skey = 0;
            var pkey = 0;
            for(var i = 0 ; i<sItemLen;i++){
                if (currentStoreId == sItem[i].storeId){
                     skey = i
                }
            }
            // console.log(skey);

            var sCartLen = sItem[skey].cart.length;
            for(var i = 0 ; i < sCartLen;i++){
                if(currentProductId == sItem[skey].cart[i].productId){
                    pkey = i
                }
            }
            // console.log(pkey);

            // //存入对应项数据
            var  getStore = store.get("cartData");
            delete getStore.item[skey].cart[pkey]
            getStore.item[skey].cart.length-1;

            if(sItemLen == sCartLen == 0){
                delete getStore.item
            }
            // store.set("cartData", getStore);
            // console.log(getStore);


            if (selectedLength == 1) {
                $this.parent().parent().parent().remove();
                cartItem = cartItem - 1;
                if (cartItem == 0) {
                    $("#nothingBuy").show();
                }
            } else {
                $this.parent().parent().remove();
            }
        });


        $(document).on("click", ".unactive-cart-item", function () {
            var $this = $(this);
            $(".offEditPanel").show();
        });

        $(document).on("click", ".cancelOffItem", function () {
            $(".offEditPanel").hide();
        });

        $(document).on("click", ".removeOffItem", function (e) {
            var $parent = $(e.target).closest('div.offEditPanel').parent();
            $parent.find(".cart-off-store-img-text-label").remove();
            $(".offEditPanel").hide();
        });


        // 点击 商品选择
        $(".cart-list-select").on('click', function () {
            var $this = $(this);
            var rsn = 0;
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
            } else {
                rs.attr("checked", false);
            }
            $(".text-all-select").hide();
            $(".text-selected").show();
            checkedText();
            calcResultToHTML();
        });

        // 点击 店铺选择
        $(".cart-shop-select").on('click', function () {
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
                console.log(len)
                console.log(rlen)
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
        $("#cartAllSelect").on('click', function () {
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
            // console.log(pricesArr);
            // console.log(quantArr);
            $(".text-all-select").hide();
            $(".text-selected").show();
            checkedText();
            calcResultToHTML();
        });

        // 数量添加
        $(".panelAddBtn").on('click', function () {
            var $this = $(this);
            var number = $this.parent().find('input.panel-text-input').val() || 0;
            number = parseInt(number) + 1;
            $this.parent().find('input.panel-text-input').val(number);
            var quantity = $this.parents(".cart-store-img-text-label").find(".cart-item-text > .cart-item-display-flex > .cart-item-quantity > .quantity-ct");
            quantity.text(number)
        });

        // 数量减少
        $(".panelMinusBtn").on('click', function () {
            var $this = $(this);
            var number = $this.parent().find('input.panel-text-input').val() || 0;
            number = parseInt(number) - 1;
            if (number == 0) {
                number = 1;
            }
            $this.parent().find('input.panel-text-input').val(number);
            var quantity = $this.parents(".cart-store-img-text-label").find(".cart-item-text > .cart-item-display-flex > .cart-item-quantity > .quantity-ct");
            quantity.text(number)
        });


        //商品计算后的结果给到HTML
        function calcResultToHTML() {
            var total = calcCart();
            $(".totalGoodsPrices > .sign-number").text(total);
        }

        //计算已选择商品总价
        function calcCart() {
            var totalPrice = 0;
            for (var i = 0, j = 0; i < pricesArr.length, j < quantArr.length; i++, j++) {
                totalPrice += pricesArr[i] * quantArr[j];
            }
            // console.log(totalPrice);
            return totalPrice;
        }

    });


    //范式
    var genData2 = {
        "item":[{
            "storeId": 289737,
            "storeName": "ASUS专卖店",
            "cart": [
                {
                    "productUrl": "http://localhost:8080/html/detail/detail.html",
                    "thumbnailUrl": "//img.alicdn.com/bao/uploaded/i3/1136619306/TB2g9ZQnpXXXXcbXXXXXXXXXXXX_!!1136619306.jpg_sum.jpg",
                    "productName": "LG趣拍得 POPO相机 手机便携相片打印机 v1",
                    "productId": 5217781,
                    "productPrice": 135,
                    "shippingCost": 0,
                    "productDescription": "show show sho ds",
                    "quant": 1,
                    "productState": true,
                }
            ]
        }]
    };

    var genData3 = store.get("cartData");
    // console.log(genData3);


    //已选中数量
    function checkedText() {
        var checkedLength = $(".cart-list-select:checked").length;
        $(".text-select-number").text(checkedLength);
    }


    // my_header
    require.async('handlebars', function () {
        var storeData = {
            data: '7795'
        };
        var tpl = require('/layout/cart/cart.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(storeData);
        $("#cartPage").html(html);
    });

    // cartHeader
    require.async('handlebars', function () {
        var storeData = {
            headerTitle: '购物车'
        };
        var tpl = require('/layout/cart/cartHeader.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(storeData);
        $("#cartHeader").html(html);
    });


    // cartFooter
    require.async('handlebars', function () {
        var storeData = {
            data: '7795'
        };
        var tpl = require('/layout/cart/cartFooter.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(storeData);
        $("#cartFooter").html(html);
    });

    // cartIndex
    require.async('handlebars', function () {
        var storeData = {};
        var tpl = require('/layout/common/cartIndex.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(storeData);
        $("#cartIndex").html(html);
    });

    // nothingBuy
    require.async('handlebars', function () {
        var storeData = {};
        var tpl = require('/layout/cart/nothingBuy.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(storeData);
        $("#nothingBuy").html(html);
    });

    // cartItem
    require.async('handlebars', function () {
        require.async('transDetails', function () {
            var storeData = genData3;
            var tpl = require('/layout/cart/cartItem.tpl');
            var template = Handlebars.compile(tpl);
            var html = template(storeData);
            $("#cartItem").html(html);
        });
    });

});
