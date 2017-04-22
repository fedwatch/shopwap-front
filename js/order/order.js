/**
 * Created by Administrator on 2017/3/13.
 */
define(function (require, exports, module) {
    require('jquery');
    require('swiper');
    require('mockjs');
    require('light7');
    require('store');

    var genData = {};

    $(function () {

    });

    //orderBottomBar
    require.async('handlebars', function () {
        var data = genData;
        var tpl = require('/layout/order/orderBottomBar.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#orderBottomBar").html(html);
    });

    //orderAddress
    require.async('handlebars', function () {
        var data = genData;
        var tpl = require('/layout/order/orderAddress.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#orderAddress").html(html);
    });

   //orderDetail
    require.async('handlebars', function () {
        var data = genData;
        var tpl = require('/layout/order/orderDetail.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#orderDetail").html(html);
    });

    //orderHeader
    require.async('handlebars', function () {
        var data = genData;
        var tpl = require('/layout/order/orderHeader.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#orderHeader").html(html);
    });
});