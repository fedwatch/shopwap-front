/**
 * Created by qs on 2017/5/17.
 */
define(function (require, exports, module) {
    require('store');
    var username = store.get("username");
    var pageNumber = store.get("pageNumber")||0;

    var isBalancePay = store.get("isBalancePay");
    var type = store.get("type") || "payment";
    var paymentPluginId = store.get("paymentPluginId") || "lianlianpayPlugin";
    var mergeSn = store.get("mergeSn");
    var amount = store.get("amount");
    var cardId = store.get("cardId");
    var app_request = store.get("app_request") || '3';
    var username = store.get("username");

});