/**
 * Created by Administrator on 2017/7/3.
 */
var EventUtil = {
    addHandler: function (el, type, funs) {
        if (el.addEventListener) {
            el.addEventListener(type, funs, false);
        } else if (el.attachEvent) {
            el.attachEvent("on" + type, funs);
        } else {
            el["on" + type] = funs;
        }
    }
};