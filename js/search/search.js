/**
 * Created by Administrator on 2017/3/10.
 */
define(function(require,exports,module){
    require('jquery');
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
                $cancelSearchBtn.hide();
                $cancelTextIcon.show();
            })
        });

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
        })

        $clearHistoryBtn.on("click",function () {
            localStorage.clear();
            $historySearch.empty();
        });
    });


    

    // searchHeader
    require.async('handlebars',function(){
        var data = {
            data:'男装春上新'
        };
        var tpl = require('/layout/search/searchHeader.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#searchHeader").html(html);
        // $("#navbarSearch").html(tpl);
    });

    // searchPrompt
    require.async('handlebars',function(){
        var data = {
            data:'738950'
        };
        var tpl = require('/layout/search/searchPrompt.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#searchPrompt").html(html);
        // $("#navbarSearch").html(tpl);
    });

    // searchVague
    require.async('handlebars',function(){
        var data = {
            data:'738951'
        };
        var tpl = require('/layout/search/searchVague.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#searchVague").html(html);
        // $("#navbarSearch").html(tpl);
    });

    // historySearch
    require.async('handlebars',function(){
        var data = {
            data:'738951'
        };
        var tpl = require('/layout/search/historySearch.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#historySearch").html(html);
    });

    // hotSearch
    require.async('handlebars',function(){
        var data = {
            data:'738951'
        };
        var tpl = require('/layout/search/hotSearch.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#hotSearch").html(html);
    });


})
