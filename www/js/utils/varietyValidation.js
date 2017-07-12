//寻找除当前input元素之外的其他input元素
function selectInput(elem, tag, flag) {
    if (flag == true) {
        elem.parents(tag).nextAll().find("input").attr("disabled", true);
    } else {
        elem.parents(tag).nextAll().find("input").removeAttr("disabled");
    }
}
//密码验证
function checkPassword(str, elem, tag) {

    var strong = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    var middle = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    var weak = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;

    var flag = true;
    if (str.length < 6 || str == "" || str.length > 16) {
        $.toast("请输入6到16位字符串");
        flag = true;
        selectInput(elem, tag, flag);
    } else {
        if (strong.test(str)) {
            $.toast("密码强度强");
        }
        if (middle.test(str)) {
            $.toast("密码强度中等");
        }
        if (weak.test(str)) {
            $.toast("密码强度弱");
        }
        flag = false;
        selectInput(elem, tag, flag);
    }
}
//确认密码验证
function surePassword(firstElem, secondElem) {
    var flag;
    if (firstElem.val() != secondElem.val()) {
        $.toast("两次密码不同");
        flag = false;
    } else {
        flag = true;
    }
    return flag;
}

//姓名验证
function checkUserNameAddr(str, elem, tag) {
    var reg = /^[\u4E00-\u9FA5]{2,4}$/;
    var flag;
    if (!reg.test(str)) {
        $.toast("不符合标准！");
        flag = false;
        selectInput(elem, tag, flag);
    } else {
        flag = false;
        selectInput(elem, tag, flag);
        console.log("符合标准！");
    }
}

//手机号验证
function checkUserPhoneA(str, elem, tag) {
    var reg = /^1\d{10}$/;
    var flag;
    if (!reg.test(str)) {
        $.toast("手机号不符合标准！");
        flag = false;
        selectInput(elem, tag, flag);
    } else {
        flag = false;
        selectInput(elem, tag, flag);
        console.log("手机号符合标准！");
    }
}