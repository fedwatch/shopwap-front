/**
 * Created by Administrator on 2017/3/13.
 */
define(function (require,exports,module) {
    require('jquery');

    $(function () {
        $.fn.longPress = function (fn) {
            var timeouter = undefined;
            var $this  = $(this);
            for(var i = 0;i < $this.length; i++){
                $this[i].addEventListener('touchstart',function (e) {
                    timeouter = setTimeout(fn,800);
                },false);
                $this[i].removeEventListener('touchend',function (e) {
                    clearTimeout(timeouter);
                },false)
            }
        }
    });

})