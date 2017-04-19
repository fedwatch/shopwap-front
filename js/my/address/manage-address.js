define(function(require,exports,module){
    require('jquery');
    require.async('handlebars',function(){
        var data={};
        var tpl=require('/layout/my/address/manage-address.tpl');
        var template=Handlebars.compile(tpl);
        var html=template(data);
        $("#manage-address").html(html);
    });
})
