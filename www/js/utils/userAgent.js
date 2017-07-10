/**
 * Created by Administrator on 2017/6/15.
 */
(function ($) {
    $(function () {
        var ua = getOs();
        function getOs() {
            var u = navigator.userAgent;
            if (u.indexOf("MSIE") > 0) {
                return "MSIE";
            }
            if (u.indexOf("Firefox") > 0) {
                return "Firefox";
            }
            if (u.indexOf("Safari") > 0) {
                return "Safari";
            }
            if (u.indexOf("Camino") > 0) {
                return "Camino";
            }
            if (u.indexOf("Gecko/") > 0) {
                return "Gecko";
            }
        }
        console.log(ua)

    })
})(jQuery || window.jQuery);
