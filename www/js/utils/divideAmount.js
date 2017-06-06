//分割需要的金额
function divideAmount(dom1,dom2,amount){
    var amountArr=amount.toString().split(".");
    $(dom1).text(amountArr[0]);
    $(dom2).text(amountArr[1]);
}

