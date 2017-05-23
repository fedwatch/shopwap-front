define(function (require, exports, module) {
    require("jquery");
    require("light7");
    // require("mockjs");
    require("siteUrl");
    require("store");
    require("getUser");

    var username = store.get("username");
    var mergeSn = store.get("mergeSn");
    var paymentPluginId = store.get("paymentPluginId");
    var allAmount = store.get("allAmount");
    var balance = store.get("balance");
    var paymentPluginId = store.get("paymentPluginId");
    var type = store.get("type") || "payment";
    var amount = store.get("amount");
    var app_request = store.get("app_request") || '3';
    var cardId=store.get("cardId");

    var isLock = store.get("isLock")||false;

    var isBalancePay = false;
    jQuery.support.cors = true;
    $(function () {


        payment(username, mergeSn);

        store.set("type", "payment");
        store.set("app_request", "3");

        $(document).on('click', '.modal-inner .bank-li a', function () {
            var $this = $(this);
            var cardId = $this.data("id");
            store.set("cardId", cardId);
            console.log(cardId);
            var app_request_url = location.host + '/m/url';
            paySubmit(isBalancePay, type, paymentPluginId, mergeSn, amount, cardId, app_request, username,app_request_url);
        });


    });

    /***支付界面，合并支付
     * @param username
     * @param mergeSn
     * */
    function payment(username, mergeSn) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.PAY_MENT.URL,
            type: ORDER_SITE_URL.PAY_MENT.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                mergeSn: mergeSn
            },
            success: function (data) {
                if (data.authStatus == "200") {
                    var paymentPluginId = data.paymentPlugins[0].id;
                    store.set("paymentPluginId", paymentPluginId);
                    var allAmount = data.allAmount;
                    store.set("allAmount", allAmount);
                    balance = data.balance;
                    store.set("balance", balance);

                    require.async("handlebars", function () {
                        var tpl = require('/m/layout/payment/alipay/commonPay.tpl');
                        var template = Handlebars.compile(tpl);
                        var html = template(data);
                        $("#commonPay").html(html);

                        //分割金额显示在页面
                        var allAomuntArr= allAmount.toString().split(".");
                        $(".aInt").text(allAomuntArr[0]);
                        $(".sCeil").text(allAomuntArr[1]);

                        $("#payWay").find("#aliPay").text(data.allAmount);

                        initSureSubmit();
                        //获取银行卡列表
                        getBankList(username);
                        //选择支付方式
                        choicePay();

                        $("#balancePayBtn").click(function () {
                            if (isBalancePay == false) {
                                isBalancePay = true;
                                calculate_amount(username, mergeSn, paymentPluginId, isBalancePay);
                            } else {
                                isBalancePay = false;
                                calculate_amount(username, mergeSn, paymentPluginId, isBalancePay);
                            }

                        });

                    })

                }
            }
        })

    }


    //计算订单支付金额
    function calculate_amount(username, mergeSn, paymentPluginId, isBalancePay) {
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.CALCULATE_AMOUNT.URL,
            type: ORDER_SITE_URL.CALCULATE_AMOUNT.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                mergeSn: mergeSn,
                paymentPluginId: paymentPluginId,
                isUseBalance: isBalancePay
            },
            success: function (data) {
                if (data.authStatus == "200") {
                    var amount = data.amount;
                    store.set("amount", amount);

                    if (isBalancePay == true) {
                       // debugger;
                        $("#balance-yue").css({visibility: "visible"}).find("span").text(data.balancePay);
                     if (balance >= allAmount) {

                            $("#balance-yue").css({visibility: "visible"}).find("span").text(data.balancePay);
                            $("#paychoice").css({display: "none"});
                            /*$("#surePays").click(function () {

                            })*/
                        } else {
                            $("#balance-yue").css({visibility: "visible"}).find("span").text(data.balancePay);
                            $("#paychoice").css({display: "block"});
                            $("#payWay").find("#aliPay").text(data.amount);
                        }
                    } else {
                        $("#paychoice").css({display: "block"});
                        $("#balance-yue").css({visibility: "hidden"});
                        $("#payWay").find("#aliPay").text(data.amount);
                    }


                }
            }
        })
    }


    /**
     * 根据卡号查询卡信息
     * @param bankCardNo
     * @param username
     */
    function bankcardBind(bankCardNo, username) {
        $.ajax({
            url: BASE_URL + PAYMENT_SITE_URL.BANKCARD_BIND.URL,
            type: PAYMENT_SITE_URL.BANKCARD_BIND.METHOD,
            dataType: PAYMENT_SITE_URL.DATATYPE,
            data: {
                bankCardNo: bankCardNo,
                username: username,
            },
            success: function (data) {

            }
        })
    }

    /**
     * 银行卡列表
     * @param username
     */
    function getBankList(username) {
        $.ajax({
            url: BASE_URL + PAYMENT_SITE_URL.BANK_LIST.URL,
            type: PAYMENT_SITE_URL.BANK_LIST.METHOD,
            dataType: PAYMENT_SITE_URL.DATATYPE,
            data: {
                username: username,
            },
            success: function (data) {
                // console.log(data);
                if (data.authStatus == '200') {
                    require.async("handlebars", function () {
                        require.async("transCommonPay", function () {
                            var tpl = require('/m/layout/payment/bankList.tpl');
                            var template = Handlebars.compile(tpl);
                            var html = template(data);
                            $("#bankList").html(html);
                        });
                    });
                }


            }
        })
    }


    /**
     * 绑定银行卡并支付
     * @param isBalancePay
     * @param type
     * @param paymentPluginId
     * @param mergeSn
     * @param amount
     * @param app_request
     * @param bankCardType
     * @param bankCode
     * @param bankCardNo
     * @param cardType
     * @param cardNum
     * @param phoneNum
     * @param verificationCode
     * @param expiryDate
     * @param verifyCode
     * @param username
     * @param bankName
     */
    function boundCardPay(isBalancePay, type, paymentPluginId, mergeSn, amount, app_request, bankCardType, bankCode, bankCardNo, cardType, cardNum, phoneNum, verificationCode, expiryDate, verifyCode, username, bankName) {
        $.ajax({
            url: BASE_URL + PAYMENT_SITE_URL.BOUND_CARD_PAY.URL,
            type: PAYMENT_SITE_URL.BOUND_CARD_PAY.METHOD,
            dataType: PAYMENT_SITE_URL.DATATYPE,
            data: {
                isBalancePay: isBalancePay,
                type: type,
                paymentPluginId: paymentPluginId,
                mergeSn: mergeSn,
                amount: amount,
                app_request: app_request,
                bankCardType: bankCardType,
                bankCode: bankCode,
                bankCardNo: bankCardNo,
                cardType: cardType,
                cardNum: cardNum,
                phoneNum: phoneNum,
                verificationCode: verificationCode,
                expiryDate: expiryDate,
                verifyCode: verifyCode,
                username: username,
                bankName: bankName
            },
            success: function (data) {
                // console.log(data);

            }
        })
    }


    /**
     * 快捷支付
     * @param isBalancePay
     * @param type
     * @param paymentPluginId
     * @param mergeSn
     * @param amount
     * @param cardId
     * @param app_request
     * @param username
     * @param app_request_url
     */
    function paySubmit(isBalancePay, type, paymentPluginId, mergeSn, amount, cardId, app_request, username,app_request_url) {
        $.ajax({
            url: BASE_URL + PAYMENT_SITE_URL.PAY_SUBMIT.URL,
            type: PAYMENT_SITE_URL.PAY_SUBMIT.METHOD,
            dataType: PAYMENT_SITE_URL.DATATYPE,
            data: {
                isBalancePay: isBalancePay,
                type: type,
                paymentPluginId: paymentPluginId,
                mergeSn: mergeSn,
                amount: amount,
                cardId: cardId,
                app_request: app_request,
                username: username,
                app_request_url: app_request_url,
            },
            success: function (data) {
                if (data.authStatus == '200') {
                    if (data.parameterMap) {
                        store.set("req_data", data.parameterMap.req_data);
                        return location.href = '../sendMoney.html';
                    }
                }else if(data.authStatus == '211'){
                    window.location.href = "../alipay/paySuccess.html?paymentSn="+data.paymentSn;
                }
                else if(data.authStatus == '500'){
                    // 部分订单已被锁定，不能进行支付操作 需要 执行 解锁
                    store.set("isLock",true);

                    checkLock(username,mergeSn);

                    console.log("====== paySubmit ====== start")
                    console.log(store.get("isLock"));
                    console.log("====== paySubmit ====== start")
                    if(store.get("isLock") == false){
                        paySubmit(isBalancePay, type, paymentPluginId, mergeSn, amount, cardId, app_request, username)
                    }
                }

                else{
                    $.toast(data.authMsg);
                }

            }
        })
    }

    /**
     *
     * @param username
     * @param mergeSn
     */
    function checkLock(username,mergeSn){
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.CHECK_LOCK.URL,
            type: ORDER_SITE_URL.CHECK_LOCK.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                mergeSn : mergeSn ,

            },
            success: function (data) {
                if (data.authStatus){
                    if(data.isLock == true){
                    //    检查一旦锁定就执行解锁操作 从而实现自动解锁
                        unlock(username,mergeSn);
                    }
                }else{
                    $.toast(data.authMsg)
                }

            }
        })
    }

    /**
     * 支付手动解锁订单
     * @param username
     * @param mergeSn
     */
    function unlock(username,mergeSn){
        $.ajax({
            url: BASE_URL + ORDER_SITE_URL.UNLOCK.URL,
            type: ORDER_SITE_URL.UNLOCK.METHOD,
            dataType: ORDER_SITE_URL.DATATYPE,
            data: {
                username: username,
                mergeSn : mergeSn  ,

            },
            success: function (data) {
                if(data.authStatus == '200'){
                    store.set("isLock",false);
                    location.reload();
                    console.log("====== unlock ====== start")
                    console.log(store.get("isLock"))
                    console.log("====== unlock ====== end")
                }
            }
        })
    }

    //确认支付
    function initSureSubmit() {

        $("#surePays").click(function () {
            var $ticks = $("#payWay").find(".card").find(".tick");
            var $selectedTick = $ticks.filter(".tickSelected");
            var value = $selectedTick.attr("data-value");
            if (isBalancePay == true) {
                if (balance < allAmount && $selectedTick.length == 0) {
                    $.toast("余额不足，请选择支付方式");
                } else if (balance < allAmount && $selectedTick.length > 0 && value == "lianlianpayPlugin") {
                    tankuang();
                } else if(balance > allAmount){
                    paySubmit(isBalancePay, type, paymentPluginId, mergeSn, amount, cardId, app_request, username);
                }else{
                    $.toast("暂不支持该支付方式");
                }
            } else {
                if ($selectedTick.length > 0) {
                    if (value == "lianlianpayPlugin") {
                        tankuang();
                    } else {
                        $.toast("暂不支持该支付方式");
                    }

                } else {
                    $.toast("请选择一种支付方式");
                }
            }
        });

    }

    //弹框
    function tankuang() {
        var $bankList = $("#bankList").find(".bankMask .cont").html();
        $.modal({
            title: '<div class="select-bank">选择银行卡<span class="pull-right cancel-m">取消</span></div>',
            afterText: $bankList,
            buttons: [{
                text: '<div class="bank-but"><a href="javascript:;" class="external but-a" style="border:none;"><span>+</span>添加新卡</a></div>',
                onClick: function () {
                    window.location.href = "../payment.html";
                }
            }]
        });
        $(".modal-buttons").addClass("bank-but-radius");
        $(".cancel-m").click(function () {
            $(".modal").css({display: "none"});
            $.closeModal();
        });
    }

    //选择或添加银行卡
    function checkBank() {

        var $checkPayList = $("#payWay").find(".card").find(".checkPay");
        $checkPayList.each(function (index, item) {
            $(this).click(function () {
                var $idName = $(this).attr("id");
                if ($idName == "lianlianpayPlugin") {
                    var $bankList = $("#bankList").find(".bankMask .cont").html();
                    $.modal({
                        title: '<div class="select-bank">选择银行卡<span class="pull-right cancel-m">取消</span></div>',
                        afterText: $bankList,
                        buttons: [{
                            text: '<div class="bank-but"><a href="javascript:;" class="external but-a" style="border:none;"><span>+</span>添加新卡</a></div>',
                            onClick: function () {
                                window.location.href = "../payment.html";
                            }
                        }]
                    });
                    $(".modal-buttons").addClass("bank-but-radius");
                    $(".cancel-m").click(function () {
                        $(".modal").css({display: "none"});
                        $.closeModal();
                    });

                } else {
                    $.toast("暂不支持该支付方式");
                }

            })
        });
    }

    //选择支付方式
    function choicePay() {
        $(".checkPay").each(function (index, item) {
            $(this).click(function () {
                if (!$(this).find(".tickys").hasClass("tickSelected")) {
                    $(this).find(".tickys").addClass("tickSelected").parents().siblings().find(".tickys").removeClass("tickSelected").addClass("tick");
                    $(this).find(".morePay").css({visibility: "visible"}).parents().siblings().find(".morePay").css({visibility: "hidden"});
                } else {
                    $(this).find(".tickys").removeClass("tickSelected");
                    $(this).find(".morePay").css({visibility: "hidden"});
                }
            })
        })
    }

})
