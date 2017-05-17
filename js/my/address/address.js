define(function(require,exports,module){
    require('jquery');
    require('store');
    require('siteUrl');
    require('user');

    $(function(){

    });

    var username = '18717964640';
    var pageNumber = 0;
    var pageSize = 0;

    require.async('handlebars',function(){
        receiverList(username,pageNumber,pageSize)
    });


    /**
     * 收货地址列表查看
     * @param username
     * @param pageNumber
     * @param pageSize
     */
    function receiverList(username,pageNumber,pageSize){
        $.ajax({
            url:BASE_URL+MEMBER_SITE_URL.LIST.URL,
            type:MEMBER_SITE_URL.LIST.METHOD,
            dataType:MEMBER_SITE_URL.DATATYPE,
            data:{
                username :username,
                pageNumber  :pageNumber,
                pageSize  :pageSize,
            },
            success:function (data) {
                if(data.authStatus){
                    var tpl=require('/layout/my/address/address.tpl');
                    var template=Handlebars.compile(tpl);
                    var html=template(data);
                    $("#address").html(html);
                    edit();
                }
            }
        });
    }

    // function edit(){
    //     var $edit=$(".edit");
    //     var $addressOperate=$(".address-operate");
    //     var $addressList=$(".address-list").find(".ad-list");
    //     var $delete=$(".delete");
    //     var flag = true;
    //     $(document).on('click','.edit',function(){
    //         console.log("click edit")
    //         var $this = $(this);
    //         $this.click(function(){
    //             if(flag==true){
    //                 $edit.text("取消编辑");
    //                 $addressOperate.css({display:"block"});
    //                 flag=false;
    //             }else{
    //                 $edit.text("编辑");
    //                 $addressOperate.css({display:"none"});
    //                 flag=true;
    //             }
    //         });
    //     });
    //
    //     $(".edit-op").click(function(){
    //         window.location.href="./add-address.html";
    //     });
    //     $delete.each(function(index,item){
    //         $(this).click(function(){
    //             $addressList.eq(index).remove();
    //         })
    //     });
    // }


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
