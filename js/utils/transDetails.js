//用户评价
Handlebars.registerHelper("transUserReviews",function(value){
    if(value == 0){
        return "暂无评价";
    } else if(value > 0 && value < 999){
        return value + " 条评价";
    } else if(value > 999){
        return "999 +";
    }
});
//商品状态 下架
Handlebars.registerHelper("transProductState",function(value){
    if(value == true){
        return "";
    } else if(value == false){
        return "商品下架";
    }
});