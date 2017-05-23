/**
 * Created by Administrator on 2017/3/10.
 */
define(function (require, exports, module) {
    require('jquery');
    require('light7');
    // require("page");
    require('store');
    require("siteUrl");

    jQuery.support.cors = true;
    $(function () {
        var $searchHint = $('#searchHint');
        var $searchPrompt = $('#searchPrompt');
        var $searchVague = $('#searchVague');
        var $historySearch = $('#historySearch');
        var $clearHistoryBtn = $('#clearHistoryBtn');

        var $leftFixNav = $('#leftFixNav');
        var $rightSearchNav = $('#rightSearchNav');
        var $cancelTextIcon = $('#cancelTextIcon');

        // var historyList=store.set("historySearch",$searchHint.val());


        $searchVague.css({display: "none"})
        $searchHint.one("focus", function () {

            $cancelTextIcon.show().css({display: "inline-block"});
            $searchVague.css({display: "block"})
        });
        $searchHint.on('keyup', function (e) {
            var $this = $(this);
            var searchHint = $this.val();
            var historyList = store.set("historySearch", searchHint);

            if (searchHint == "") {
                $cancelTextIcon.show().css({display: "inline-block"});
                $searchVague.css({display: "block"});
                $("#shopListShowIndex2").css({display: "none"})
            } else {
                $("#shopListShowIndex2").css({display: "block"})
                search(searchHint, "1", "10", "", "", "", "")
            }
        });

        $("#cancelTextIcon").click(function () {
            $searchHint.val("");
            $cancelTextIcon.show().css({display: "inline-block"});
            $searchVague.css({display: "block"});
            $("#shopListShowIndex2").css({display: "none"})
        });


        $clearHistoryBtn.on("click", function () {
            store.set('historySearch', '');
            $historySearch.empty();
            $(".history").hide();
        });

    });


    var genData = {
        hotSearch: [
            {keyword: "飘正阳绿翡翠A货", url: ""},
            {keyword: "手表", url: ""},
            {keyword: "钱包", url: ""},
            {keyword: "香水", url: ""},
            {keyword: "烟酒", url: ""},
            {keyword: "保健品", url: ""},
            {keyword: "手链", url: ""},
            {keyword: "腰带", url: ""},
            {keyword: "鞋子", url: ""},
            {keyword: "戒指", url: ""}
        ]
    };


    // searchHeader
    require.async('handlebars', function () {
        var data = genData;
        var tpl = require('/m/layout/search/searchHeader.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#searchHeader").html(html);
        // $("#navbarSearch").html(tpl);
    });


    // searchVague
    require.async('handlebars', function () {
        var data = genData;
        var tpl = require('/m/layout/search/searchVague.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#searchVague").html(html);
        // $("#navbarSearch").html(tpl);
    });

    // historySearch
    require.async('handlebars', function () {
        var historySearch = store.get('historySearch');
        if (historySearch == '') {
            $(".history").hide();
        } else if (historySearch !== '') {
            var data = historySearch;
            var tpl = require('/m/layout/search/historySearch.tpl');
            var template = Handlebars.compile(tpl);
            var html = template(data);
            $("#historySearch").html(html);
        }
    });

    // hotSearch
    /*   require.async('handlebars',function(){
     var data = genData;
     var tpl = require('/layout/search/hotSearch.tpl');
     var template = Handlebars.compile(tpl);
     var html = template(data);
     $("#hotSearch").html(html);
     });
     */
    var MAK;
    /**
     *
     * @param keyword
     * @param pageNumber
     * @param pageSize
     * @param categoryIds
     * @param brandIds
     * @param startPrice
     * @param endPrice
     */
    function search(keyword, pageNumber, pageSize, categoryIds, brandIds, startPrice, endPrice) {
        $.ajax({
            url: BASE_URL + COMMON_SITE_URL.SEARCH.URL,
            type: COMMON_SITE_URL.SEARCH.METHOD,
            dataType: COMMON_SITE_URL.DATATYPE,
            data: {
                keyword: keyword,
                pageNumber: pageNumber,
                pageSize: pageSize,
                categoryIds: categoryIds,
                brandIds: brandIds,
                startPrice: startPrice,
                endPrice: endPrice
            },

            success: function (data) {
                console.log(data);
                $("#searchPrompt").hide();
                $("#searchVague").css({display: "none"});
                $("#shopListSort").css({display: "none"});
                var products = data["products"]
                var  html='';
                products.map(function(data){
                    html +='<div class="col-50 productCategory" >'+
                        '<a href="javascript:;"  data-product-id="'+data.id+'" class="external">'+
                        '<div style="background: #fff;padding:0 0;margin: .25rem 0;width:100%;height:12rem;overflow: hidden;">'+
                        '<img src="'+data.image+'" alt="" style="width:100%;height:7rem;overflow: hidden;">'+
                        '<h4 class="product-title" style="padding:0 .25rem;font-size:.7rem;color:#000;">'+data.name+'</h4>'+
                        '<span class="product-price-box" style="padding:0 .25rem;font-size:.5rem;color:#ff0000;">￥<span style="font-size:.65rem;">'+data.price+'</span>'+'</span>'+'<span class="product-buyer-number-box" style="font-size:.5rem;color:#999;">已有 <span>'+data.sales+'</span>人购买</span>'+ '</div>'+
                        '</a>'+ '</div>';
                });



               /* require.async('handlebars', function () {
                    var tpl = require('/m/layout/cartgory/productCategory.tpl');
                    var template = Handlebars.compile(tpl);
                    MAK = template(data);
                    console.log(MAK);
                });
                $("#shopListShowIndex2").html(MAK);*/
                $("#shopListShowIndex2").html(html);
            }
        });

    }
});

