define(function (require, exports, module) {
    require('jquery');
    require('store');
    require('siteUrl');
    require('user');
    require('light7');
    require('city-picker');

    jQuery.support.cors = true;
    $(function () {
        var editStatus = store.get("editStatus");
        var addressId = store.get("addressId");
        var username = store.get("username");
        //用户名验证
        var $userNameAddr = $("#ad-user-name");
        var $userPhoneS = $("#user-phoneS");
        var $userAddress = $("#user-address");
        var $userZipCode = $("#user-zipcode");
        var $userDefault = $("#user-default");
        var $cityPicker = $("#city-picker");
        var $areaId = $("#areaId");
        var userDefault = false;


        getDataFromLS();
        function getDataFromLS() {
            if (editStatus) {
                $.ajax({
                    url: BASE_URL + MEMBER_SITE_URL.VIEW.URL,
                    type: MEMBER_SITE_URL.VIEW.METHOD,
                    dataType: MEMBER_SITE_URL.DATATYPE,
                    data: {
                        username: username,
                        id: addressId
                    },
                    cache:false,
                    async:false,
                    success: function (data) {
                        // console.log(data.authMsg);
                        if (data.authStatus == '200') {
                            $userNameAddr.val(data.receiver.consignee);
                            $userPhoneS.val(data.receiver.phone);
                            $userAddress.val(data.receiver.address);
                            $userZipCode.val(data.receiver.zipCode);
                            $cityPicker.val(data.receiver.area.fullName);
                            $areaId.val(data.receiver.area.id);
                            if (data.receiver.isDefault == true) {
                                $("#user-default").click();
                            }
                        }
                    }
                });
            }
        }

        $(document).on("pageInit", function () {
            $("#city-picker").cityPicker({
                toolbarTemplate: '<header class="bar bar-nav">\
      <button class="button button-link pull-right close-picker">完成</button>\
      <h1 class="title"></h1>\
      </header>'
            });
        });
        $.init();


        $userPhoneS.on('blur', function () {
            var userPhoneVal = $userPhoneS.val();
            checkUserPhoneA(userPhoneVal, $userPhoneS, "li");
        });

        $userNameAddr.on('blur', function () {
            var userPhoneVal = $userNameAddr.val();
            checkUserNameAddr(userPhoneVal, $userNameAddr, "li");
        });
        $.init();

        $(document).on('click', '#user-default', function () {
            if (userDefault == false) {
                userDefault = true;
            } else {
                userDefault = false;
            }
            // console.log(userDefault)
        });

        $(document).on('click', '.addAddressBtn', function () {
            var $this = $(this);
            var username = store.get("username");
            var consignee = $userNameAddr.val();
            if(consignee == '' || typeof consignee == "undefined"){
                $.toast("联系人不可为空")
                return;
            }
            var areaId = $areaId.val() || store.get("areaId");
            var address = $userAddress.val();
            var zipCode = $userZipCode.val();
            var phone = $userPhoneS.val();
            if (phone == '' || typeof phone == "undefined"){
                $.toast("手机号不可为空");
                return;
            }
            if( address == '' || typeof address == "undefined"){
                $.toast("地址不可为空");
                return;
            }
            var isDefault = userDefault;
            if (editStatus == null || editStatus == false) {
                receiverSave(username, consignee, areaId, address, zipCode, phone, isDefault)

            } else if (editStatus) {
                receiverUpdate(username, addressId, consignee, areaId, address, zipCode, phone, isDefault)
                // return history.go(-1)
            }

        });
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
            cache:false,
            async:false,
            success: function (data) {
                if (data.authStatus) {
                    var tpl = require('/m/layout/my/address/address.tpl');
                    var template = Handlebars.compile(tpl);
                    var html = template(data);
                    $("#address").html(html);
                    edit();
                }
            }
        });
    }


    function receiverSave(username, consignee, areaId, address, zipCode, phone, isDefault) {
        $.ajax({
            url: BASE_URL + MEMBER_SITE_URL.SAVE.URL,
            type: MEMBER_SITE_URL.SAVE.METHOD,
            dataType: MEMBER_SITE_URL.DATATYPE,
            data: {
                username: username,
                consignee: consignee,
                areaId: areaId,
                address: address,
                zipCode: zipCode,
                phone: phone,
                isDefault: isDefault,
            },
            cache:false,
            async:false,
            success: function (data) {
                if(data.authStatus == '200'){
                    $.toast(data.authMsg);
                    return history.go(-1);
                }else if (data.authStatus == '403'){
                    $.toast(data.authMsg,3000);
                    return location.href = '/m/html/my/login/login.html';
                }else if(data.authStatus == '500'){
                    $.toast(data.authMsg);
                    return;
                }
            }
        });
    }


    function receiverUpdate(username, id, consignee, areaId, address, zipCode, phone, isDefault) {
        $.ajax({
            url: BASE_URL + MEMBER_SITE_URL.UPDATE.URL,
            type: MEMBER_SITE_URL.UPDATE.METHOD,
            dataType: MEMBER_SITE_URL.DATATYPE,
            data: {
                username: username,
                consignee: consignee,
                id: id,
                areaId: areaId,
                address: address,
                zipCode: zipCode,
                phone: phone,
                isDefault: isDefault,
            },
            cache:false,
            async:false,
            success: function (data) {
                if(data.authStatus == '200'){
                    $.toast(data.authMsg);
                    return history.go(-1);
                }else if (data.authStatus == '403'){
                    $.toast(data.authMsg,3000);
                    return location.href = '/m/html/my/login/login.html';
                }else if(data.authStatus == '500'){
                    $.toast(data.authMsg);
                    return;
                }

            }
        });
    }

})
