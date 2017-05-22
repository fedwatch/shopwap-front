/**
 * Created by qs on 2017/4/10.
 */
function bankCheck(bankno) {
    var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）
    var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var oddArr = new Array();  //奇数位*2的积 <9
    var oddArr2 = new Array(); //奇数位*2的积 >9

    var arrEven = new Array();  //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) {//奇数位
            if (parseInt(newArr[j]) * 2 < 9)
                oddArr.push(parseInt(newArr[j]) * 2);
            else
                oddArr2.push(parseInt(newArr[j]) * 2);
        }
        else //偶数位
            arrEven.push(newArr[j]);
    }

    var odd_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
    var odd_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < oddArr2.length; h++) {
        odd_child1.push(parseInt(oddArr2[h]) % 10);
        odd_child2.push(parseInt(oddArr2[h]) / 10);
    }

    var oddSum = 0; //奇数位*2 < 9 的数组之和
    var sumEven = 0; //偶数位数组之和
    var oddSumChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var oddSumChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < oddArr.length; m++) {
        oddSum = oddSum + parseInt(oddArr[m]);
    }

    for (var n = 0; n < arrEven.length; n++) {
        sumEven = sumEven + parseInt(arrEven[n]);
    }

    for (var p = 0; p < odd_child1.length; p++) {
        oddSumChild1 = oddSumChild1 + parseInt(odd_child1[p]);
        oddSumChild2 = oddSumChild2 + parseInt(odd_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(oddSum) + parseInt(sumEven) + parseInt(oddSumChild1) + parseInt(oddSumChild2);

    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;

    if (lastNum == luhm && lastNum.length != 0) {
        return true;
    }
    else {
        return false;
    }
}

