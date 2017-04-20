define(function(require,exports,module){
    require('jquery');
    $(function(){});
    require.async('handlebars',function(){
        var data={};
        var tpl=require('/layout/my/account/changePassword3.tpl');
        var template=Handlebars.compile(tpl);
        var html=template(data);
        $("#changePasswordPage3").html(html);
    });
})
