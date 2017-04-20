/**
 * Created by Administrator on 2017/3/10.
 */
define(function(require,exports,module){
    require('jquery');
    require('store');
    // require('mockjs');
    $(function(){
        var $searchHint = $('#searchHint');
        var $searchPrompt = $('#searchPrompt');
        var $searchVague = $('#searchVague');
        var $historySearch = $('#historySearch');
        var $clearHistoryBtn = $('#clearHistoryBtn');
        var $cancelSearchBtn = $('#cancelSearchBtn');
        var $leftFixNav = $('#leftFixNav');
        var $rightSearchNav = $('#rightSearchNav');
        var $cancelTextIcon = $('#cancelTextIcon');



        $searchHint.on("focus",function () {
            var $this = $(this);
            $this.parent().css({width: '100%'});
            $searchPrompt.show();
            $searchVague.hide();
            // $cancelTextIcon.hide();
            $leftFixNav.hide();
            $rightSearchNav.css({
                marginLeft: "0.5em",
                marginRight: "0.5em",
                display: "flex",
                alignItems: "center"
            });
            $this.on("keydown",function(){

                // searchPrompt
                require.async('handlebars',function(){
                    var data = genData;
                    var tpl = require('/layout/search/searchPrompt.tpl');
                    var template = Handlebars.compile(tpl);
                    var html = template(data);
                    $("#searchPrompt").html(html);
                    // $("#navbarSearch").html(tpl);
                });
                $cancelSearchBtn.hide();
                $cancelTextIcon.show();
            })
            $this.on('mouseleave',function () {
                $("#searchPrompt").hide();
            })
        });

        $("#searchForm").on('submit',function () {
            console.log('search keywords submit ');
            var insertSearch = store.get("historySearch").historySearch || [];
            var searchHint = $("#searchHint").val();
            insertSearch.push(searchHint);

            store.set("historySearch",{historySearch:insertSearch});
        })

        $cancelTextIcon.on('click',function () {
            $rightSearchNav.css({
                marginLeft: "3.0em",
                marginRight: "0.5em",
                // display: "flex",
                // alignItems: "center"
            });
            $leftFixNav.show();
            $cancelTextIcon.hide();
            $searchHint.val("");
        });

        $clearHistoryBtn.on("click",function () {
            store.set('historySearch','');
            $historySearch.empty();
            $(".history").hide();
        });
    });

    var genData = {
        hotSearch:[
            "飘正阳绿翡翠A货",
            "手表",
            "钱包",
            "香水",
            "烟酒",
            "保健品",
            "手链",
            "腰带",
            "鞋子",
            "戒指",
        ]
    };


    

    // searchHeader
    require.async('handlebars',function(){
        var data = genData;
        var tpl = require('/layout/search/searchHeader.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#searchHeader").html(html);
        // $("#navbarSearch").html(tpl);
    });



    // searchVague
    require.async('handlebars',function(){
        var data = genData;
        var tpl = require('/layout/search/searchVague.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#searchVague").html(html);
        // $("#navbarSearch").html(tpl);
    });

    // historySearch
    require.async('handlebars',function(){
        // store.set("historySearch",{historySearch:["飘正阳绿翡翠A货", "手表", "钱包", "香水", "烟酒", "保健品", "手链", "腰带", "鞋子", "戒指",]});
        var historySearch = store.get('historySearch');
        console.log(historySearch);
        if( historySearch == ''){
            $(".history").hide();
        }else if(historySearch !== ''){
            var data = historySearch;
            var tpl = require('/layout/search/historySearch.tpl');
            var template = Handlebars.compile(tpl);
            var html = template(data);
            $("#historySearch").html(html);
        }
    });

    // hotSearch
    require.async('handlebars',function(){
        var data = genData;
        var tpl = require('/layout/search/hotSearch.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#hotSearch").html(html);
    });
});
