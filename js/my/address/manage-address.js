define(function(require,exports,module){
    require('jquery');
    require('store');
    require('siteUrl');

    $(function(){

    });

    var username = store.get("username");
    var pageNumber = store.get("pageNumber");

    require.async('handlebars',function(){
        $.ajax({
            url:BASE_URL+MEMBER_SITE_URL.LIST.URL,
            type:MEMBER_SITE_URL.LIST.METHOD,
            dataType:MEMBER_SITE_URL.DATATYPE,
            data:{
                username :username,
                pageNumber  :pageNumber,
            },
            success:function (data) {
                var tpl=require('/layout/my/address/manage-address.tpl');
                var template=Handlebars.compile(tpl);
                var html=template(data);
                $("#manage-address").html(html);
            }
        });

    });

    /**
     * 收货地址列表查看
     * @param username
     * @param pageNumber
     */
    function receiverList(username,pageNumber){
        $.ajax({
            url:BASE_URL+MEMBER_SITE_URL.LIST.URL,
            type:MEMBER_SITE_URL.LIST.METHOD,
            dataType:MEMBER_SITE_URL.DATATYPE,
            data:{
                username :username,
                pageNumber  :pageNumber,
            },
            success:function (data) {
                console.log(data);
            }
        });
    }
})
