/**
 * Created by Administrator on 2017/3/21.
 */
define(function(require,exports,module){
    require('jquery');
    require('siteUrl');


    function sendMoney(){

        $.ajax({
            url:BASE_URL+PAYMENT_SITE_URL.PAY_SUBMIT.URL,
            dataType:PAYMENT_SITE_URL.DATATYPE,
            type:PAYMENT_SITE_URL.PAY_SUBMIT.METHOD,
            data:{

            },
            success:function (data) {

            }
        });

    }
});