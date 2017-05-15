define(function(require,exports,module){
    require('jquery');
    require('store');
    require('siteUrl');
    require('user');

    $(function(){

    });


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
                var tpl=require('/layout/my/address/address.tpl');
                var template=Handlebars.compile(tpl);
                var html=template(data);
                $("#address").html(html);
            }
        });


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
                edit();
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

    function edit(){
        var $edit=$(".edit");
        var $addressOperate=$(".address-operate");
        var $addressList=$(".address-list").find(".ad-list");
        var $delete=$(".delete");
        var flag=true;
        $edit.click(function(){
            if(flag==true){
                $edit.text("取消编辑");
                $addressOperate.css({display:"block"});
                flag=false;
            }else{
                $edit.text("编辑");
                $addressOperate.css({display:"none"});
                flag=true;
            }
        });
        $(".edit-op").click(function(){
            window.location.href="./add-address.html";
        });
        $delete.each(function(index,item){
            $(this).click(function(){
                $addressList.eq(index).remove();
            })
        });
    }

})
