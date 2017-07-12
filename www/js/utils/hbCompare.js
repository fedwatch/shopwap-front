//注册一个比较大小的Helper,判断data1是否等于data2
Handlebars.registerHelper("compare", function (data1, data2, options) {
    if (data1 == data2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});