//用户评价
Handlebars.registerHelper("transBankCardType",function(value){
    if(value == 'deposit'){
        return "借记卡";
    } else if(value == 'blue'){
        return "信用卡";
    }
});
