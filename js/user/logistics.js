define(function(require,exports,module){
    require('jquery');
    require('light7');
    require('light7-swiper');
    require('light7-swipeout');
    require('siteUrl');

    jQuery.support.cors = true;
    $(function(){

        var sn = "213213121";
        var username = "yaodengyin";
        $.ajax({
            url:BASE_URL+LOGISTICS_URLS.PRODUCT_SEARCH.URL,
            dataType:"json",
            type:LOGISTICS_URLS.PRODUCT_SEARCH.METHOD,
            data:{username:username,sn:sn},
            success:function(result){
                if(result.authStatus=="200"){
                    console.log(result);
                    require.async('handlebars',function(){
                        var getData=result;
                        var tpl=require('/layout/user/logistics.tpl');
                        var template=Handlebars.compile(tpl);
                        var html=template(getData);
                        $("#logistics").html(html);
                        $.init();
                    });
                }
            }
        })
    });



})