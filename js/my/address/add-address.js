define(function(require,exports,module){
    require('jquery');
    require('store');
    require('siteUrl');
    require('user');
    require('light7');
    require('city-picker');
    jQuery.support.cors = true;
    $(function(){
        $(document).on("pageInit", function () {
            $("#city-picker").cityPicker({
                toolbarTemplate: '<header class="bar bar-nav">\
      <button class="button button-link pull-right close-picker">完成</button>\
      <h1 class="title"></h1>\
      </header>'
            });
        });
        $.init();


        //用户名验证
        var $userNameAddr = $("#ad-user-name");
        var $userPhoneS = $("#user-phoneS");
        var $userAddress = $("#user-address");
        var $userZipCode = $("#user-zipcode");
        var $userDefault = $("#user-default");
        var userDefault = false;
        $userPhoneS.on('blur', function () {
            var userPhoneVal = $userPhoneS.val();
            checkUserPhoneA(userPhoneVal, $userPhoneS, "li");
        });

        $userNameAddr.on('blur', function () {
            var userPhoneVal = $userNameAddr.val();
            checkUserNameAddr(userPhoneVal, $userNameAddr, "li");
        });
        $.init();

        $(document).on('click','#user-default',function () {
           if(userDefault == false){
               userDefault = true;
           }else{
               userDefault = false;
           }
           console.log(userDefault)
        });

        $(document).on('click','.addAddressBtn',function () {
            var $this = $(this);
            var username =  store.get("username");
            var consignee =  $userNameAddr.val();
            var areaId;
            var address = $userAddress.val();
            var zipCode = $userZipCode.val();
            var phone = $userPhoneS.val();
            var isDefault = userDefault;

            receiverSave(username,consignee,areaId,address,zipCode,phone,isDefault)
        });
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


    function receiverSave(username,consignee,areaId,address,zipCode,phone,isDefault){
        $.ajax({
            url:BASE_URL+MEMBER_SITE_URL.SAVE.URL,
            type:MEMBER_SITE_URL.SAVE.METHOD,
            dataType:MEMBER_SITE_URL.DATATYPE,
            data:{
                username :username,
                consignee   :consignee ,
                areaId   :areaId ,
                address    :address  ,
                zipCode     :zipCode   ,
                phone      :phone    ,
                isDefault       :isDefault     ,
            },
            success:function (data) {
                console.log(data);
                $.toast(data.authMsg,1500);
            }
        });
    }

})
