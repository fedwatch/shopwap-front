//订单状态
Handlebars.registerHelper("transOrderStatus",function(value){
    if(value == 'unconfirmed'){
        return "未支付";
    } else if(value == 'confirmed'){
        return "买家已付款";
    } else if(value == 'completed'){
        return "已完成";
    } else if(value == 'cancelled'){
        return "已关闭";
    } else if(value == 'expired'){
        return "已失效";
    }else if(value == 'shipped'){
        return "已发货";
    }else if(value == 'partialReturns'){
        return "部分退货";
    }else if(value == 'returned'){
        return "已退货";
    }else if(value == 'closed'){
        return "已关闭";
    }else if(value == 'partialPayment'){
        return "部分支付";
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


//注册一个比较大小的Helper,判断data1是否等于data2
Handlebars.registerHelper("compare",function(data1,data2,options){
    if(data1 == data2){
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
});