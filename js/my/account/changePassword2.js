define(function(require,exports,module){
    require('jquery');
    $(function(){});
    require.async('handlebars',function(){
        var data={};
        var tpl=require('/layout/my/account/changePassword2.tpl');
        var template=Handlebars.compile(tpl);
        var html=template(data);
        $("#changePasswordPage2").html(html);
    });
})
