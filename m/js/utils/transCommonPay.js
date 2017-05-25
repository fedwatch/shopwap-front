//用户评价
Handlebars.registerHelper("transBankCardType",function(value){
    if(value == 'deposit'){
        return "借记卡";
    } else if(value == 'blue'){
        return "信用卡";
    }
});

Handlebars.registerHelper("equals",function(v1, v2, options){
    if (v1 == v2) {
        return options.fn(this);// 满足添加继续执行
    }
    return options.inverse(this);// 不满足条件执行{{else}}部分
});
