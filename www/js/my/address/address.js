define(function (require, exports, module) {
    require('jquery');
    require('store');
    require('siteUrl');
    require('user');
    require('light7');
    require('city-picker');

    jQuery.support.cors = true;
    $(function () {
        $(document).on('click', '.address-button', function () {
            store.set("editStatus", false);
        })
    });

    var username = store.get("username");
    var pageNumber = 1;
    var pageSize = 10;

    require.async('handlebars', function () {
        receiverList(username, pageNumber, pageSize)
    });


    /**
     * 收货地址列表查看
     * @param username
     * @param pageNumber
     * @param pageSize
     */
    function receiverList(username, pageNumber, pageSize) {
        $.ajax({
            url: BASE_URL + MEMBER_SITE_URL.LIST.URL,
            type: MEMBER_SITE_URL.LIST.METHOD,
            dataType: MEMBER_SITE_URL.DATATYPE,
            data: {
                username: username,
                pageNumber: pageNumber,
                pageSize: pageSize,
            },
            cache:true,
            async:false,
            success: function (data) {
                if (data.authStatus) {
                    var tpl = require('/zqVue/shopwap-front/www/layout/my/address/address.tpl');
                    var template = Handlebars.compile(tpl);
                    var html = template(data);
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


    function edit() {
        var $edit = $(".edit");
        var $addressOperate = $(".address-operate");
        var $addressList = $(".address-list").find(".ad-list");
        var $delete = $(".delete");
        var flag = true;
        $edit.click(function () {
            if (flag == true) {
                $edit.text("取消编辑");
                $addressOperate.css({display: "block"});
                flag = false;
            } else {
                $edit.text("编辑");
                $addressOperate.css({display: "none"});
                flag = true;
            }
        });
        $(".edit-op").click(function () {
            var $this = $(this);
            var id = $this.data("id");
            store.set("addressId", id);
            store.set("editStatus", true);
            window.location.href = "./add-address.html";
        });
        $delete.each(function (index, item) {
            var $this = $(this);
            $(this).click(function () {
                var id = $this.data("id")
                receiverDelete(username, id);
                $addressList.eq(index).remove();
                location.reload();
            })
        });
    }


    function receiverDelete(username, id) {
        $.ajax({
            url: BASE_URL + MEMBER_SITE_URL.DELETE.URL,
            type: MEMBER_SITE_URL.DELETE.METHOD,
            dataType: MEMBER_SITE_URL.DATATYPE,
            data: {
                username: username,
                id: id
            },
            cache:true,
            async:false,
            success: function (data) {
                $.toast(data.authMsg);
            }
        });
    }
})
