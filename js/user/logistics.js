define(function(require,exports,module){
    require('jquery');
    require('mockjs');
    require('light7');
    require('light7-swiper');
    require('light7-swipeout');
    $(function(){

    });
    require.async('handlebars',function(){
        var data={};
        var tpl=require('/layout/user/logistics.tpl');
        var template=Handlebars.compile(tpl);
        var html=template(data);
        $("#logistics").html(html);
    });
})